create extension if not exists pg_cron with schema pg_catalog;

create or replace function public.publish_due_scheduled_blog_posts()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  published_count integer;
begin
  update public.web
  set
    status = 'published',
    updated_at = timezone('utc'::text, now())
  where status = 'scheduled'
    and published_at is not null
    and published_at <= timezone('utc'::text, now());

  get diagnostics published_count = row_count;
  return published_count;
end;
$$;

revoke execute on function public.publish_due_scheduled_blog_posts() from public;
revoke execute on function public.publish_due_scheduled_blog_posts() from anon;
revoke execute on function public.publish_due_scheduled_blog_posts() from authenticated;
grant execute on function public.publish_due_scheduled_blog_posts() to postgres;
grant execute on function public.publish_due_scheduled_blog_posts() to service_role;

drop policy if exists "web_public_read_visible" on public.web;
drop policy if exists "web_public_read_published" on public.web;

create policy "web_public_read_published"
on public.web
for select
to anon
using (
  status = 'published'
  and published_at is not null
  and published_at <= timezone('utc'::text, now())
);

select public.publish_due_scheduled_blog_posts();

select cron.schedule(
  'publish-due-scheduled-blog-posts',
  '* * * * *',
  $$select public.publish_due_scheduled_blog_posts();$$
);
