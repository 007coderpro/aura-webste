"use client";

import type { Session } from "@supabase/supabase-js";
import {
  Archive,
  CalendarClock,
  Copy,
  Eye,
  FileText,
  Image as ImageIcon,
  LogIn,
  LogOut,
  Plus,
  Save,
  Search,
  Send,
  Target,
  Trash2,
  Undo2,
  UploadCloud,
} from "lucide-react";
import type { ChangeEvent, DragEvent, FormEvent, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { BlogFaq, BlogPost, BlogStatus } from "@/lib/blogs";
import {
  blogPostFromRow,
  emptyBlogPost,
  getBlogSeoChecks,
  getBlogSeoScore,
  getRelatedBlogPosts,
  markdownToHtml,
  slugifyTitle,
} from "@/lib/blogs";
import {
  blogKeywordCategories,
  blogKeywordIntents,
  blogKeywordTargets,
  findBlogKeywordTarget,
  getBlogKeywordWriterBrief,
  type BlogKeywordTarget,
} from "@/lib/blogKeywordStrategy";
import { createSupabaseBrowserClient } from "@/lib/supabase";

type BlogForm = Omit<BlogPost, "tags" | "faqs" | "published_at"> & {
  tagsText: string;
  faqsText: string;
  publishedAtLocal: string;
};

type BlogRevision = {
  id: number;
  created_at: string;
  snapshot: BlogPost;
};

type BlogImageAsset = {
  alt: string;
  name: string;
  path: string;
  url: string;
};

const supabase = createSupabaseBrowserClient();
const blogImageBucket = "blog-images";
const maxBlogImageUploadBytes = 10 * 1024 * 1024;
const editorialRoles = ["admin", "editor", "writer", "viewer"] as const;

export default function AdminBlogDashboard() {
  const contentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedId, setSelectedId] = useState<number | "new">("new");
  const [form, setForm] = useState<BlogForm>(() => postToForm(emptyBlogPost));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const [revisions, setRevisions] = useState<BlogRevision[]>([]);
  const [uploadedImages, setUploadedImages] = useState<BlogImageAsset[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageDropActive, setImageDropActive] = useState(false);
  const [selectedKeywordSlug, setSelectedKeywordSlug] = useState(blogKeywordTargets[0]?.slug ?? "");

  const role = typeof session?.user.app_metadata?.role === "string" ? session.user.app_metadata.role : "";
  const isAuthorized = editorialRoles.includes(role as (typeof editorialRoles)[number]);
  const canEdit = role === "admin" || role === "editor" || role === "writer";
  const canDelete = role === "admin";

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("web")
      .select("*")
      .order("updated_at", { ascending: false });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    const nextPosts = ((data ?? []) as unknown as Record<string, unknown>[]).map(rowToPost);
    setPosts(nextPosts);
    setSelectedId((currentSelectedId) => {
      if (currentSelectedId !== "new" && !nextPosts.some((post) => post.id === currentSelectedId)) {
        return "new";
      }

      return currentSelectedId;
    });
  }, []);

  const loadRevisions = useCallback(async (postId: number) => {
    const { data, error } = await supabase
      .from("blog_revisions")
      .select("id,created_at,snapshot")
      .eq("post_id", postId)
      .order("created_at", { ascending: false })
      .limit(8);

    if (error) {
      setMessage(error.message);
      return;
    }

    setRevisions(
      ((data ?? []) as unknown as Record<string, unknown>[]).map((row) => ({
        id: Number(row.id),
        created_at: String(row.created_at ?? ""),
        snapshot: blogPostFromRow((row.snapshot ?? {}) as Record<string, unknown>),
      })),
    );
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session && isAuthorized) {
      const timeoutId = window.setTimeout(() => {
        void loadPosts();
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }
  }, [session, isAuthorized, loadPosts]);

  const seoPost = useMemo(() => formToBlogPost(form), [form]);
  const checks = useMemo(() => getBlogSeoChecks(seoPost), [seoPost]);
  const seoScore = useMemo(() => getBlogSeoScore(seoPost), [seoPost]);
  const relatedSuggestions = useMemo(() => getRelatedBlogPosts(seoPost, posts, 3), [seoPost, posts]);
  const matchedKeywordTarget = useMemo(
    () => findBlogKeywordTarget({ slug: form.slug, keyword: form.focus_keyword }),
    [form.slug, form.focus_keyword],
  );
  const selectedKeywordTarget =
    blogKeywordTargets.find((target) => target.slug === selectedKeywordSlug) ?? matchedKeywordTarget ?? blogKeywordTargets[0];
  const selectedKeywordBrief = useMemo(
    () => (selectedKeywordTarget ? getBlogKeywordWriterBrief(selectedKeywordTarget) : null),
    [selectedKeywordTarget],
  );
  const publishedCount = posts.filter((post) => post.status === "published").length;
  const scheduledCount = posts.filter((post) => post.status === "scheduled").length;
  const draftCount = posts.filter((post) => post.status === "draft").length;

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setSession(data.session);
    setPassword("");
  }

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
    setPosts([]);
    setSelectedId("new");
    setForm(postToForm(emptyBlogPost));
    setUploadedImages([]);
  }

  async function savePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canEdit) {
      setMessage("This role can view posts but cannot save changes.");
      return;
    }

    setSaving(true);
    setMessage("");

    const payload = formToPayload(form);
    const validationError = validatePayload(payload);

    if (validationError) {
      setSaving(false);
      setMessage(validationError);
      return;
    }

    const request =
      selectedId === "new"
        ? supabase.from("web").insert(payload).select("*").single()
        : supabase.from("web").update(payload).eq("id", selectedId).select("*").single();

    const { data, error } = await request;
    setSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    const savedPost = rowToPost(data as Record<string, unknown>);
    setPosts((current) => {
      const withoutSaved = current.filter((post) => post.id !== savedPost.id);
      return [savedPost, ...withoutSaved].sort(sortByUpdatedAt);
    });
    setSelectedId(savedPost.id ?? "new");
    setForm(postToForm(savedPost));
    if (savedPost.id) {
      void loadRevisions(savedPost.id);
    }
    setMessage("Saved.");
  }

  async function deletePost() {
    if (selectedId === "new" || !canDelete) {
      return;
    }

    const confirmed = window.confirm("Delete this blog post?");
    if (!confirmed) {
      return;
    }

    setSaving(true);
    const { error } = await supabase.from("web").delete().eq("id", selectedId);
    setSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setPosts((current) => current.filter((post) => post.id !== selectedId));
    setSelectedId("new");
    setForm(postToForm(emptyBlogPost));
    setRevisions([]);
    setMessage("Deleted.");
  }

  async function duplicateAsDraft() {
    if (!canEdit) {
      setMessage("This role can view posts but cannot duplicate posts.");
      return;
    }

    const copyForm: BlogForm = {
      ...form,
      id: undefined,
      title: `Copy of ${form.title || "Untitled post"}`,
      slug: `${slugifyTitle(form.slug || form.title)}-copy`,
      status: "draft",
      publishedAtLocal: "",
    };
    const payload = formToPayload(copyForm);
    const validationError = validatePayload(payload);

    if (validationError) {
      setMessage(validationError);
      return;
    }

    setSaving(true);
    const { data, error } = await supabase.from("web").insert(payload).select("*").single();
    setSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    const savedPost = rowToPost(data as Record<string, unknown>);
    setPosts((current) => [savedPost, ...current].sort(sortByUpdatedAt));
    setSelectedId(savedPost.id ?? "new");
    setForm(postToForm(savedPost));
    setMessage("Duplicated as draft.");
  }

  function startNewPost() {
    setSelectedId("new");
    setForm(postToForm(emptyBlogPost));
    setRevisions([]);
    setUploadedImages([]);
    setPreview(false);
  }

  function updateForm<K extends keyof BlogForm>(key: K, value: BlogForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateTitle(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: current.slug ? current.slug : slugifyTitle(value),
      seo_title: current.seo_title || value,
    }));
  }

  function applyKeywordTarget(target: BlogKeywordTarget) {
    setSelectedKeywordSlug(target.slug);
    setForm((current) => ({
      ...current,
      title: target.title,
      slug: target.slug,
      excerpt: current.excerpt || target.seoDescription,
      seo_title: target.seoTitle,
      seo_description: target.seoDescription,
      canonical_url: current.canonical_url || `https://auravpn.com/blog/${target.slug}`,
      focus_keyword: target.primaryKeyword,
      category: target.category,
      tagsText: mergeCommaValues(current.tagsText, target.tags),
      search_intent: keywordIntentValue(target.searchIntent),
      cta_type: target.ctaType,
      og_title: current.og_title || target.seoTitle,
      og_description: current.og_description || target.seoDescription,
    }));
  }

  function setWorkflowStatus(status: BlogStatus) {
    setForm((current) => ({
      ...current,
      status,
      publishedAtLocal:
        status === "published" && !current.publishedAtLocal
          ? toLocalDateTime(new Date().toISOString())
          : status === "draft" || status === "archived"
            ? ""
            : current.publishedAtLocal,
    }));
  }

  function restoreRevision(revision: BlogRevision) {
    setForm(postToForm(revision.snapshot));
    setMessage("Revision loaded. Save the post to restore this version.");
  }

  async function uploadBlogImages(files: File[]) {
    if (!canEdit) {
      setMessage("This role can view posts but cannot upload images.");
      return;
    }

    const imageFiles = files.filter(isSupportedBlogImage);
    if (imageFiles.length === 0) {
      setMessage("Drop or choose JPG, PNG, WebP, or GIF image files.");
      return;
    }

    const oversizedFile = imageFiles.find((file) => file.size > maxBlogImageUploadBytes);
    if (oversizedFile) {
      setMessage(`${oversizedFile.name} is larger than the 10 MB image limit.`);
      return;
    }

    setUploadingImage(true);
    setMessage("");

    try {
      const uploadedAssets: BlogImageAsset[] = [];

      for (const file of imageFiles) {
        const path = buildBlogImagePath(file, form.slug || form.title || "draft");
        const { error } = await supabase.storage.from(blogImageBucket).upload(path, file, {
          cacheControl: "31536000",
          contentType: getBlogImageContentType(file) ?? "image/jpeg",
          upsert: false,
        });

        if (error) {
          throw error;
        }

        const { data } = supabase.storage.from(blogImageBucket).getPublicUrl(path);
        uploadedAssets.push({
          alt: imageAltFromFilename(file.name),
          name: file.name,
          path,
          url: data.publicUrl,
        });
      }

      setUploadedImages((current) => [...uploadedAssets, ...current]);
      if (uploadedAssets.length === 1 && !form.cover_image_url) {
        setForm((current) => ({
          ...current,
          cover_image_url: uploadedAssets[0].url,
          cover_image_alt: current.cover_image_alt || uploadedAssets[0].alt,
        }));
      }
      setMessage(`Uploaded ${uploadedAssets.length} blog image${uploadedAssets.length === 1 ? "" : "s"}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploadingImage(false);
    }
  }

  function handleImageInputChange(event: ChangeEvent<HTMLInputElement>) {
    void uploadBlogImages(Array.from(event.target.files ?? []));
    event.target.value = "";
  }

  function handleImageDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setImageDropActive(false);
    void uploadBlogImages(Array.from(event.dataTransfer.files));
  }

  function insertImageIntoContent(asset: BlogImageAsset) {
    const textarea = contentTextareaRef.current;
    let nextCursorPosition = 0;

    setForm((current) => {
      const markdown = `![${escapeMarkdownImageAlt(asset.alt)}](${asset.url})`;
      const content = current.content ?? "";
      const start = textarea?.selectionStart ?? content.length;
      const end = textarea?.selectionEnd ?? content.length;
      const before = content.slice(0, start).replace(/\s*$/, "");
      const after = content.slice(end).replace(/^\s*/, "");
      const prefix = before ? `${before}\n\n` : "";
      const suffix = after ? `\n\n${after}` : "";
      const nextContent = `${prefix}${markdown}${suffix}`;
      nextCursorPosition = prefix.length + markdown.length;
      return { ...current, content: nextContent };
    });

    window.setTimeout(() => {
      textarea?.focus();
      textarea?.setSelectionRange(nextCursorPosition, nextCursorPosition);
    }, 0);
  }

  function setImageAsCover(asset: BlogImageAsset) {
    setForm((current) => ({
      ...current,
      cover_image_url: asset.url,
      cover_image_alt: current.cover_image_alt || asset.alt,
    }));
  }

  if (loading && !session) {
    return <AdminShell>Loading admin session...</AdminShell>;
  }

  if (!session) {
    return (
      <AdminShell>
        <div className="mx-auto max-w-md rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/20 p-3 text-blue-200">
              <LogIn className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Blog admin sign in</h1>
              <p className="mt-1 text-sm text-gray-300">Use the Supabase admin email and password.</p>
            </div>
          </div>
          <form onSubmit={signIn} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-gray-200">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-blue-400"
                autoComplete="email"
                required
              />
            </label>
            <label className="block text-sm font-medium text-gray-200">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-blue-400"
                autoComplete="current-password"
                required
              />
            </label>
            {message && <p className="text-sm text-red-200">{message}</p>}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Sign in
            </button>
          </form>
        </div>
      </AdminShell>
    );
  }

  if (!isAuthorized) {
    return (
      <AdminShell>
        <div className="mx-auto max-w-2xl rounded-lg border border-red-300/20 bg-red-400/10 p-6">
          <h1 className="text-xl font-semibold text-white">Editorial access required</h1>
          <p className="mt-2 text-sm leading-6 text-red-100">
            This account is signed in, but its Supabase app metadata does not include one of: admin, editor, writer, viewer.
          </p>
          <button
            type="button"
            onClick={signOut}
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-normal text-blue-200">Aura VPN admin</p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-white">Blog dashboard</h1>
          <p className="mt-2 text-sm text-gray-300">
            {posts.length} posts, {publishedCount} published, {scheduledCount} scheduled, {draftCount} drafts. Role: {role}.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={startNewPost}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            New post
          </button>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </div>

      {message && <p className="mt-5 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200">{message}</p>}

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-3">
          {posts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => {
                setSelectedId(post.id ?? "new");
                setForm(postToForm(post));
                setUploadedImages([]);
                if (post.id) {
                  void loadRevisions(post.id);
                }
                setPreview(false);
              }}
              className={`w-full rounded-lg border p-4 text-left transition ${
                selectedId === post.id
                  ? "border-blue-400 bg-blue-400/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-normal text-blue-200">{post.status}</span>
              <span className="mt-2 block text-sm font-semibold text-white">{post.title}</span>
              <span className="mt-1 block truncate text-xs text-gray-400">/blog/{post.slug}</span>
            </button>
          ))}
          {posts.length === 0 && <p className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-gray-300">No posts yet.</p>}
        </aside>

        <form onSubmit={savePost} className="space-y-6">
          <section className="rounded-lg border border-white/10 bg-white/5 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">{selectedId === "new" ? "New post" : "Edit post"}</h2>
                <p className="mt-1 text-sm text-gray-400">Write in Markdown. Published posts appear on `/blog` and in the sitemap.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setPreview((current) => !current)}
                  aria-pressed={preview}
                  className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  {preview ? "Hide preview" : "Preview"}
                </button>
                {selectedId !== "new" && (
                  <button
                    type="button"
                    onClick={duplicateAsDraft}
                    disabled={!canEdit || saving}
                    className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    Duplicate
                  </button>
                )}
                {selectedId !== "new" && (
                  <button
                    type="button"
                    onClick={deletePost}
                    disabled={!canDelete || saving}
                    className="inline-flex items-center gap-2 rounded-md border border-red-300/30 px-3 py-2 text-sm font-semibold text-red-100 hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Delete
                  </button>
                )}
                <button
                  type="submit"
                  disabled={saving || !canEdit}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save className="h-4 w-4" aria-hidden="true" />
                  {saving ? "Saving" : "Save"}
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <WorkflowButton label="Publish now" icon={<Send className="h-4 w-4" aria-hidden="true" />} onClick={() => setWorkflowStatus("published")} />
              <WorkflowButton label="Schedule" icon={<CalendarClock className="h-4 w-4" aria-hidden="true" />} onClick={() => setWorkflowStatus("scheduled")} />
              <WorkflowButton label="Unpublish" icon={<Undo2 className="h-4 w-4" aria-hidden="true" />} onClick={() => setWorkflowStatus("draft")} />
              <WorkflowButton label="Archive" icon={<Archive className="h-4 w-4" aria-hidden="true" />} onClick={() => setWorkflowStatus("archived")} />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <TextField label="Title" value={form.title} onChange={updateTitle} required />
              <TextField
                label="Slug"
                value={form.slug}
                onChange={(value) => updateForm("slug", slugifyTitle(value))}
                required
              />
              <label className="block text-sm font-medium text-gray-200">
                Status
                <select
                  value={form.status}
                  onChange={(event) => updateForm("status", event.target.value as BlogStatus)}
                  className="mt-2 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-blue-400"
                >
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
              <TextField
                label="Publish date"
                type="datetime-local"
                value={form.publishedAtLocal}
                onChange={(value) => updateForm("publishedAtLocal", value)}
              />
            </div>

            <label className="mt-4 block text-sm font-medium text-gray-200">
              Excerpt
              <textarea
                value={form.excerpt}
                onChange={(event) => updateForm("excerpt", event.target.value)}
                rows={3}
                className="mt-2 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-blue-400"
                required
              />
            </label>

            {selectedKeywordTarget && selectedKeywordBrief && (
              <div className="mt-4 border-t border-white/10 pt-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Target className="h-4 w-4 text-blue-200" aria-hidden="true" />
                      SEO Content Brief
                    </h3>
                    <p className="mt-1 text-sm text-gray-300">{selectedKeywordBrief.heading}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => applyKeywordTarget(selectedKeywordTarget)}
                    className="inline-flex w-fit items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
                  >
                    <Target className="h-4 w-4" aria-hidden="true" />
                    Apply target
                  </button>
                </div>

                <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-200">
                      Target
                      <select
                        value={selectedKeywordTarget.slug}
                        onChange={(event) => setSelectedKeywordSlug(event.target.value)}
                        className="mt-2 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-blue-400"
                      >
                        {blogKeywordTargets.map((target) => (
                          <option key={target.slug} value={target.slug}>
                            {target.title}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div className="grid gap-3 text-sm text-gray-300 sm:grid-cols-2">
                      <div>
                        <span className="block text-xs font-semibold uppercase tracking-normal text-blue-200">Primary</span>
                        <span className="mt-1 block text-white">{selectedKeywordTarget.primaryKeyword}</span>
                      </div>
                      <div>
                        <span className="block text-xs font-semibold uppercase tracking-normal text-blue-200">Intent</span>
                        <span className="mt-1 block text-white">
                          {selectedKeywordTarget.searchIntent} / {selectedKeywordTarget.category}
                        </span>
                      </div>
                      <div>
                        <span className="block text-xs font-semibold uppercase tracking-normal text-blue-200">Volume / KD</span>
                        <span className="mt-1 block text-white">
                          {selectedKeywordTarget.volume ?? "TBD"} / {selectedKeywordTarget.difficulty ?? "TBD"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-xs font-semibold uppercase tracking-normal text-blue-200">CTA</span>
                        <span className="mt-1 block text-white">{selectedKeywordTarget.ctaLabel}</span>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-white">Secondary keywords</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedKeywordTarget.secondaryKeywords.map((keyword) => (
                          <span key={keyword} className="rounded-full bg-white/10 px-2 py-1 text-xs text-gray-200">
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-gray-300">{selectedKeywordBrief.secondaryKeywordGuidance}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 text-sm text-gray-300">
                    <BriefField title="Reader problem" body={selectedKeywordBrief.readerProblem} />
                    <BriefField title="Article angle" body={selectedKeywordBrief.articleAngle} />
                    <BriefField title="Product angle" body={selectedKeywordBrief.productAngle} />
                  </div>
                </div>

                <div className="mt-4 grid gap-4 text-sm text-gray-300 lg:grid-cols-3">
                  <div>
                    <p className="font-semibold text-white">Suggested outline</p>
                    <ol className="mt-2 list-decimal space-y-1 pl-4">
                      {selectedKeywordBrief.outlineGuidance.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <p className="font-semibold text-white">FAQ ideas</p>
                    <ul className="mt-2 list-disc space-y-1 pl-4">
                      {selectedKeywordBrief.faqIdeas.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-white">SEO checklist</p>
                    <ul className="mt-2 list-disc space-y-1 pl-4">
                      {selectedKeywordBrief.checklist.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 text-sm text-gray-300 lg:grid-cols-2">
                  <div>
                    <p className="font-semibold text-white">Metadata preview</p>
                    <dl className="mt-2 space-y-2">
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-normal text-blue-200">SEO title</dt>
                        <dd className="mt-1 text-white">{selectedKeywordBrief.metadata.seoTitle}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-normal text-blue-200">Description</dt>
                        <dd className="mt-1">{selectedKeywordBrief.metadata.seoDescription}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-normal text-blue-200">Canonical</dt>
                        <dd className="mt-1 break-words">{selectedKeywordBrief.metadata.canonicalUrl}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Internal links</p>
                    <ul className="mt-2 list-disc space-y-1 pl-4">
                      {selectedKeywordBrief.internalLinkGuidance.map((link) => (
                        <li key={link}>{link}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <section className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4" aria-labelledby="blog-images-heading">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 id="blog-images-heading" className="flex items-center gap-2 text-sm font-semibold text-white">
                    <ImageIcon className="h-4 w-4 text-blue-200" aria-hidden="true" />
                    Blog images
                  </h3>
                  <p className="mt-1 text-sm text-gray-300">Upload article images, then insert them into the Markdown content.</p>
                </div>
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={!canEdit || uploadingImage}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <UploadCloud className="h-4 w-4" aria-hidden="true" />
                  {uploadingImage ? "Uploading..." : "Choose images"}
                </button>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageInputChange}
                  disabled={!canEdit || uploadingImage}
                  className="sr-only"
                />
              </div>

              <div
                onDrop={handleImageDrop}
                onDragOver={(event) => {
                  event.preventDefault();
                  if (canEdit) {
                    event.dataTransfer.dropEffect = "copy";
                    setImageDropActive(true);
                  }
                }}
                onDragLeave={() => setImageDropActive(false)}
                className={`mt-4 flex min-h-32 flex-col items-center justify-center rounded-md border border-dashed px-4 py-6 text-center transition ${
                  imageDropActive ? "border-blue-300 bg-blue-500/10" : "border-white/15 bg-white/5"
                } ${!canEdit ? "opacity-60" : ""}`}
              >
                <UploadCloud className="h-8 w-8 text-blue-200" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold text-white">{uploadingImage ? "Uploading images..." : "Drag images here"}</p>
                <p className="mt-1 text-xs text-gray-400">JPG, PNG, WebP, or GIF up to 10 MB.</p>
              </div>

              {uploadedImages.length > 0 && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {uploadedImages.map((asset) => (
                    <article key={asset.path} className="rounded-md border border-white/10 bg-white/5 p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={asset.url} alt={asset.alt} className="aspect-video w-full rounded-md object-cover" loading="lazy" />
                      <p className="mt-3 truncate text-sm font-semibold text-white">{asset.name}</p>
                      <p className="mt-1 truncate text-xs text-gray-400">{asset.path}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => insertImageIntoContent(asset)}
                          className="rounded-md border border-blue-300/30 px-3 py-1.5 text-xs font-semibold text-blue-100 hover:bg-blue-400/10"
                        >
                          Insert image
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageAsCover(asset)}
                          className="rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10"
                        >
                          Use as cover
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {form.cover_image_url && (
                <div className="mt-4 rounded-md border border-white/10 bg-white/5 p-3">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-normal text-blue-200">Featured image</p>
                      <p className="mt-1 break-all text-sm text-gray-300">{form.cover_image_url}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((current) => ({
                          ...current,
                          cover_image_url: null,
                          cover_image_alt: null,
                        }))
                      }
                      className="rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
                    >
                      Clear cover
                    </button>
                  </div>
                </div>
              )}
            </section>

            <label className="mt-4 block text-sm font-medium text-gray-200">
              Content
              <textarea
                ref={contentTextareaRef}
                value={form.content}
                onChange={(event) => updateForm("content", event.target.value)}
                rows={16}
                className="mt-2 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 font-mono text-sm text-white outline-none focus:border-blue-400"
                required
              />
            </label>

            {preview && (
              <section className="mt-5 rounded-lg border border-white/10 bg-black/20 p-5">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <FileText className="h-5 w-5 text-blue-200" aria-hidden="true" />
                  Preview
                </h2>
                <h3 className="mt-5 text-3xl font-bold tracking-normal text-white">{form.title || "Untitled post"}</h3>
                <p className="mt-3 text-gray-300">{form.excerpt}</p>
                <div
                  className="mt-6 space-y-4 text-sm leading-7 text-gray-200 [&_a]:text-blue-200 [&_a]:underline [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_img]:rounded-lg [&_img]:border [&_img]:border-white/10 [&_img]:object-cover [&_li]:ml-5 [&_ol]:list-decimal [&_ul]:list-disc"
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(form.content) }}
                />
              </section>
            )}
          </section>

          <section className="rounded-lg border border-white/10 bg-white/5 p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
              <Search className="h-5 w-5 text-blue-200" aria-hidden="true" />
              SEO fields
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <TextField label="SEO title" value={form.seo_title ?? ""} onChange={(value) => updateForm("seo_title", value)} />
              <TextField
                label="Focus keyword"
                value={form.focus_keyword ?? ""}
                onChange={(value) => updateForm("focus_keyword", value)}
              />
              <TextField
                label="Canonical URL"
                value={form.canonical_url ?? ""}
                onChange={(value) => updateForm("canonical_url", value)}
              />
              <TextField
                label="Featured image alt text"
                value={form.cover_image_alt ?? ""}
                onChange={(value) => updateForm("cover_image_alt", value)}
              />
              <label className="block text-sm font-medium text-gray-200">
                Category
                <select
                  value={form.category ?? ""}
                  onChange={(event) => updateForm("category", event.target.value)}
                  className="mt-2 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-blue-400"
                >
                  <option value="">Not set</option>
                  {form.category && !blogKeywordCategories.includes(form.category) && (
                    <option value={form.category}>{form.category}</option>
                  )}
                  {blogKeywordCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-gray-200">
                Search intent
                <select
                  value={form.search_intent ?? ""}
                  onChange={(event) => updateForm("search_intent", event.target.value)}
                  className="mt-2 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-blue-400"
                >
                  <option value="">Not set</option>
                  {form.search_intent &&
                    !blogKeywordIntents.some((intent) => keywordIntentValue(intent) === form.search_intent) && (
                      <option value={form.search_intent}>{form.search_intent}</option>
                    )}
                  {blogKeywordIntents.map((intent) => (
                    <option key={intent} value={keywordIntentValue(intent)}>
                      {intent}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-gray-200">
                Robots
                <select
                  value={form.robots_meta ?? "index,follow"}
                  onChange={(event) => updateForm("robots_meta", event.target.value)}
                  className="mt-2 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-blue-400"
                >
                  <option value="index,follow">index, follow</option>
                  <option value="noindex,nofollow">noindex, nofollow</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-gray-200">
                CTA
                <select
                  value={form.cta_type}
                  onChange={(event) => updateForm("cta_type", event.target.value as BlogForm["cta_type"])}
                  className="mt-2 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-blue-400"
                >
                  <option value="download">Download</option>
                  <option value="signup">Signup</option>
                  <option value="none">None</option>
                </select>
              </label>
              <TextField label="Open Graph title" value={form.og_title ?? ""} onChange={(value) => updateForm("og_title", value)} />
              <TextField
                label="Open Graph description"
                value={form.og_description ?? ""}
                onChange={(value) => updateForm("og_description", value)}
              />
              <TextField
                label="Last reviewed"
                type="date"
                value={form.last_reviewed_at ? form.last_reviewed_at.slice(0, 10) : ""}
                onChange={(value) => updateForm("last_reviewed_at", value ? new Date(`${value}T00:00:00`).toISOString() : null)}
              />
              <TextField
                label="Next review"
                type="date"
                value={form.next_review_at ? form.next_review_at.slice(0, 10) : ""}
                onChange={(value) => updateForm("next_review_at", value ? new Date(`${value}T00:00:00`).toISOString() : null)}
              />
            </div>
            <label className="mt-4 block text-sm font-medium text-gray-200">
              SEO description
              <textarea
                value={form.seo_description ?? ""}
                onChange={(event) => updateForm("seo_description", event.target.value)}
                rows={3}
                className="mt-2 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-blue-400"
              />
            </label>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <PreviewCard title="Google preview" heading={form.seo_title || form.title || "SEO title"} body={form.seo_description || form.excerpt || "Meta description"} />
              <PreviewCard title="Social preview" heading={form.og_title || form.seo_title || form.title || "Social title"} body={form.og_description || form.seo_description || form.excerpt || "Social description"} />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <TextField label="Tags" value={form.tagsText} onChange={(value) => updateForm("tagsText", value)} />
              <TextField label="Author" value={form.author_name} onChange={(value) => updateForm("author_name", value)} />
            </div>
            <label className="mt-4 block text-sm font-medium text-gray-200">
              FAQs
              <textarea
                value={form.faqsText}
                onChange={(event) => updateForm("faqsText", event.target.value)}
                rows={4}
                placeholder="Question | Answer"
                className="mt-2 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-blue-400"
              />
            </label>

            <div className="mt-5 flex items-center justify-between rounded-md border border-white/10 bg-black/20 p-3">
              <span className="text-sm font-semibold text-white">SEO checklist score</span>
              <span className="text-lg font-bold text-blue-200">{seoScore}/100</span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {checks.map((check) => (
                <div key={check.label} className="rounded-md border border-white/10 bg-black/20 p-3">
                  <span className={`text-xs font-semibold ${check.ok ? "text-green-200" : "text-yellow-200"}`}>
                    {check.ok ? "Ready" : "Check"}
                  </span>
                  <p className="mt-1 text-sm text-gray-200">{check.label}</p>
                </div>
              ))}
            </div>
            {relatedSuggestions.length > 0 && (
              <div className="mt-5 rounded-md border border-white/10 bg-black/20 p-3">
                <p className="text-sm font-semibold text-white">Related post suggestions</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {relatedSuggestions.map((post) => (
                    <span key={post.slug} className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-200">
                      {post.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {selectedId !== "new" && (
            <section className="rounded-lg border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold text-white">Revision history</h2>
              {revisions.length === 0 ? (
                <p className="mt-3 text-sm text-gray-300">No previous revisions yet.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {revisions.map((revision) => (
                    <div key={revision.id} className="flex flex-col gap-3 rounded-md border border-white/10 bg-black/20 p-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{revision.snapshot.title || "Untitled revision"}</p>
                        <p className="mt-1 text-xs text-gray-400">{formatDateTime(revision.created_at)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => restoreRevision(revision)}
                        disabled={!canEdit}
                        className="inline-flex items-center justify-center rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Restore
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

        </form>
      </div>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  return <div className="px-6 py-10 lg:px-8"><div className="mx-auto max-w-7xl">{children}</div></div>;
}

function TextField({
  label,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block text-sm font-medium text-gray-200">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-blue-400"
        required={required}
      />
    </label>
  );
}

function WorkflowButton({ label, icon, onClick }: { label: string; icon: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
    >
      {icon}
      {label}
    </button>
  );
}

function BriefField({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/20 p-3">
      <p className="text-xs font-semibold uppercase tracking-normal text-blue-200">{title}</p>
      <p className="mt-2 leading-6 text-gray-200">{body}</p>
    </div>
  );
}

function PreviewCard({ title, heading, body }: { title: string; heading: string; body: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-normal text-blue-200">{title}</p>
      <p className="mt-3 text-base font-semibold text-white">{heading}</p>
      <p className="mt-2 text-sm leading-6 text-gray-300">{body}</p>
    </div>
  );
}

function postToForm(post: BlogPost): BlogForm {
  return {
    ...post,
    tagsText: post.tags.join(", "),
    faqsText: post.faqs.map((faq) => `${faq.question} | ${faq.answer}`).join("\n"),
    publishedAtLocal: post.published_at ? toLocalDateTime(post.published_at) : "",
  };
}

function formToBlogPost(form: BlogForm): BlogPost {
  return {
    ...emptyBlogPost,
    ...form,
    published_at: form.publishedAtLocal ? new Date(form.publishedAtLocal).toISOString() : null,
    tags: parseTags(form.tagsText),
    faqs: parseFaqs(form.faqsText),
  };
}

function formToPayload(form: BlogForm) {
  const slug = slugifyTitle(form.slug || form.title);
  const publishedAt =
    form.status === "published"
      ? form.publishedAtLocal
        ? new Date(form.publishedAtLocal).toISOString()
        : new Date().toISOString()
      : form.status === "scheduled" && form.publishedAtLocal
        ? new Date(form.publishedAtLocal).toISOString()
        : null;

  return {
    title: form.title.trim(),
    slug,
    excerpt: form.excerpt.trim(),
    content: form.content.trim(),
    status: form.status,
    published_at: publishedAt,
    cover_image_url: nullable(form.cover_image_url),
    cover_image_alt: nullable(form.cover_image_alt),
    seo_title: nullable(form.seo_title),
    seo_description: nullable(form.seo_description),
    canonical_url: nullable(form.canonical_url),
    focus_keyword: nullable(form.focus_keyword),
    category: nullable(form.category),
    robots_meta: form.robots_meta || "index,follow",
    og_title: nullable(form.og_title),
    og_description: nullable(form.og_description),
    cta_type: form.cta_type || "download",
    search_intent: nullable(form.search_intent),
    last_reviewed_at: nullable(form.last_reviewed_at),
    next_review_at: nullable(form.next_review_at),
    tags: parseTags(form.tagsText),
    faqs: parseFaqs(form.faqsText),
    author_name: form.author_name.trim() || "Aura VPN",
  };
}

function validatePayload(payload: ReturnType<typeof formToPayload>) {
  if (payload.title.length < 3) {
    return "Title must be at least 3 characters.";
  }

  if (!payload.slug) {
    return "Slug is required.";
  }

  if (payload.excerpt.length < 20 || payload.excerpt.length > 320) {
    return "Excerpt must be between 20 and 320 characters.";
  }

  if (payload.content.length < 100) {
    return "Content should be at least 100 characters before publishing.";
  }

  if (payload.status === "scheduled" && !payload.published_at) {
    return "Scheduled posts need a publish date.";
  }

  if (payload.cover_image_url && !payload.cover_image_alt) {
    return "Featured image alt text is required when a cover image is set.";
  }

  return "";
}

function parseTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function mergeCommaValues(value: string, additions: string[]) {
  const seen = new Set<string>();
  return [...parseTags(value), ...additions]
    .filter((item) => {
      const key = item.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    })
    .join(", ");
}

function keywordIntentValue(intent: string) {
  return intent.trim().toLowerCase();
}

function parseFaqs(value: string): BlogFaq[] {
  return value
    .split("\n")
    .map((line) => {
      const [question, ...answerParts] = line.split("|");
      const answer = answerParts.join("|").trim();
      return { question: question?.trim() ?? "", answer };
    })
    .filter((faq) => faq.question && faq.answer);
}

function isSupportedBlogImage(file: File) {
  return Boolean(getBlogImageContentType(file));
}

function getBlogImageContentType(file: File) {
  if (["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
    return file.type;
  }

  const extension = getBlogImageExtension(file);
  return {
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
  }[extension];
}

function buildBlogImagePath(file: File, postKey: string) {
  const postSegment = slugifyTitle(postKey) || "draft";
  const extension = getBlogImageExtension(file);
  const randomId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
  return `posts/${postSegment}/${Date.now()}-${randomId}.${extension}`;
}

function getBlogImageExtension(file: File) {
  const extension = /\.([a-z0-9]+)$/i.exec(file.name)?.[1]?.toLowerCase();

  if (extension === "jpeg") {
    return "jpg";
  }

  if (extension === "jpg" || extension === "png" || extension === "webp" || extension === "gif") {
    return extension;
  }

  if (file.type === "image/png") {
    return "png";
  }

  if (file.type === "image/webp") {
    return "webp";
  }

  if (file.type === "image/gif") {
    return "gif";
  }

  return "jpg";
}

function imageAltFromFilename(name: string) {
  return (
    name
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "Blog image"
  );
}

function escapeMarkdownImageAlt(value: string) {
  return (
    value
      .replace(/[\[\]\r\n]/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "Blog image"
  );
}

function rowToPost(row: Record<string, unknown>): BlogPost {
  return blogPostFromRow(row);
}

function nullable(value: string | null) {
  const trimmed = value?.trim() ?? "";
  return trimmed ? trimmed : null;
}

function toLocalDateTime(value: string) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function sortByUpdatedAt(a: BlogPost, b: BlogPost) {
  return new Date(b.updated_at ?? 0).getTime() - new Date(a.updated_at ?? 0).getTime();
}
