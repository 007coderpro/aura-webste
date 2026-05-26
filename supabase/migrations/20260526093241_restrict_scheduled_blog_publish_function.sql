revoke execute on function public.publish_due_scheduled_blog_posts() from public;
revoke execute on function public.publish_due_scheduled_blog_posts() from anon;
revoke execute on function public.publish_due_scheduled_blog_posts() from authenticated;
grant execute on function public.publish_due_scheduled_blog_posts() to postgres;
grant execute on function public.publish_due_scheduled_blog_posts() to service_role;
