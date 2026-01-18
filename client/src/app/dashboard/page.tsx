'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// ✅ IMPORT updateUserAvatar HERE
import { getCurrentUser, updateAccountDetails, updateUserAvatar } from '../../services/user.api'; 
import {
  User,
  Mail,
  Phone,
  Building2,
  Globe,
  Briefcase,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  RotateCcw,
  Save,
  Upload,
  X,
} from 'lucide-react';

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  companyName: string;
  website: string;
  industry: string;
  phone: string;
};

const DEFAULT_AVATAR = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

const emptyProfile: UserProfile = {
  firstName: '',
  lastName: '',
  email: '',
  avatar: DEFAULT_AVATAR,
  companyName: '',
  website: '',
  industry: '',
  phone: '',
};

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(' ');
}

function normalizeApiUser(apiResponse: any): UserProfile {
  // Handle both { data: user } and direct user object
  const u = apiResponse?.data || apiResponse || {};
  return {
    firstName: String(u.firstName ?? ''),
    lastName: String(u.lastName ?? ''),
    email: String(u.email ?? ''),
    avatar: String(u.avatar ?? DEFAULT_AVATAR),
    companyName: String(u.companyName ?? ''),
    website: String(u.website ?? ''),
    industry: String(u.industry ?? ''),
    phone: String(u.phone ?? ''),
  };
}

function isEmailLike(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function isUrlLike(v: string) {
  if (!v.trim()) return true;
  if (v.startsWith('blob:')) return true; // Allow local preview blobs
  try {
    const url = new URL(v.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function UserProfilePage() {
  const [initial, setInitial] = useState<UserProfile>(emptyProfile);
  const [form, setForm] = useState<UserProfile>(emptyProfile);
  
  // State to hold the raw file for uploading
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const dirty = useMemo(() => JSON.stringify(form) !== JSON.stringify(initial), [form, initial]);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof UserProfile, string>> = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!isEmailLike(form.email)) e.email = 'Enter a valid email';
    if (!isUrlLike(form.website)) e.website = 'Website must be a valid URL';
    return e;
  }, [form]);

  const canSave = dirty && Object.keys(errors).length === 0 && !saving;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const response = await getCurrentUser();
        if (!mounted) return;
        const normalized = normalizeApiUser(response);
        setInitial(normalized);
        setForm(normalized);
      } catch (err: any) {
        if (!mounted) return;
        const errMsg = err.response?.data?.message || err.message || 'Failed to load profile';
        setToast({ type: 'error', msg: errMsg });
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  function setField<K extends keyof UserProfile>(key: K, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      // Create local preview
      const previewUrl = URL.createObjectURL(file);
      setField('avatar', previewUrl);
    }
  }

  // ✅ UPDATED onSave FUNCTION
  async function onSave() {
    setToast(null);
    setSaving(true);
    try {
      let finalAvatarUrl = initial.avatar; // Default to existing avatar if no change

      // ---------------------------------------------------------
      // STEP 1: Upload Avatar File (if selected)
      // ---------------------------------------------------------
      if (avatarFile) {
        const formData = new FormData();
        // 'avatar' matches your backend: upload.single('avatar')
        formData.append('avatar', avatarFile); 
        
        const uploadRes = await updateUserAvatar(formData);
        
        // Extract the new URL from the upload response
        // normalizeApiUser handles { data: user } structure
        const updatedUserFromUpload = normalizeApiUser(uploadRes);
        finalAvatarUrl = updatedUserFromUpload.avatar;
      } else {
        // If no file, use whatever URL is currently in the form 
        // (handles case where user typed a URL manually, though file upload is preferred)
        finalAvatarUrl = form.avatar;
      }

      // ---------------------------------------------------------
      // STEP 2: Update Text Details
      // ---------------------------------------------------------
      const payload: UserProfile = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim().toLowerCase(),
        avatar: finalAvatarUrl, // Use the REAL url (from cloud or text), not blob:
        companyName: form.companyName.trim(),
        website: form.website.trim(),
        industry: form.industry.trim(),
        phone: form.phone.trim(),
      };

      const response = await updateAccountDetails(payload);
      const updated = normalizeApiUser(response);
      
      setInitial(updated);
      setForm(updated);
      setAvatarFile(null); // Clear pending file
      setToast({ type: 'success', msg: 'Profile updated successfully' });
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Update failed';
      setToast({ type: 'error', msg: errMsg });
    } finally {
      setSaving(false);
    }
  }

  function onReset() {
    setToast(null);
    setForm(initial);
    setAvatarFile(null);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-black">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle at 30% 30%, rgba(189,175,98,0.55), rgba(189,175,98,0) 60%)' }}
          animate={{ x: [0, 40, 0], y: [0, 25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-56 -right-56 h-[640px] w-[640px] rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle at 60% 60%, rgba(90,105,255,0.45), rgba(90,105,255,0) 60%)' }}
          animate={{ x: [0, -30, 0], y: [0, -35, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(0,0,0,0.2)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 flex flex-col gap-2"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-black/5 ring-1 ring-black/10">
              <User className="h-5 w-5 text-black/80" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Your Profile</h1>
              <p className="text-sm text-black/60">Update your personal + business identity.</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          {/* Left: Avatar + Quick Summary */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-3xl bg-white p-5 ring-1 ring-black/10 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-black/70">Profile Card</div>
              <div
                className={cn(
                  'rounded-full px-3 py-1 text-xs ring-1',
                  dirty
                    ? 'bg-[#bdaf62]/15 text-[#7a6e2a] ring-[#bdaf62]/40'
                    : 'bg-black/5 text-black/50 ring-black/10'
                )}
              >
                {dirty ? 'Unsaved changes' : 'All changes saved'}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative h-20 w-20 overflow-hidden rounded-2xl ring-1 ring-black/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.avatar || DEFAULT_AVATAR}
                  alt="avatar"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = DEFAULT_AVATAR;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/15 to-transparent" />
              </motion.div>

              <div className="min-w-0">
                <div className="truncate text-lg font-semibold">
                  {form.firstName || '—'} {form.lastName || ''}
                </div>
                <div className="truncate text-sm text-black/60">{form.email || '—'}</div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <LabelRow icon={<Building2 className="h-4 w-4" />} label="Company" value={form.companyName} />
              <LabelRow icon={<Briefcase className="h-4 w-4" />} label="Industry" value={form.industry} />
              <LabelRow icon={<Globe className="h-4 w-4" />} label="Website" value={form.website} />
              <LabelRow icon={<Phone className="h-4 w-4" />} label="Phone" value={form.phone} />
            </div>

            {/* IMAGE UPLOAD SECTION */}
            <div className="mt-6 rounded-2xl bg-black/3 p-4 ring-1 ring-black/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-black/70">
                  <ImageIcon className="h-4 w-4 text-[#7a6e2a]" />
                  Profile Photo
                </div>
                {avatarFile && (
                  <button 
                    onClick={() => {
                        setAvatarFile(null);
                        setField('avatar', initial.avatar);
                    }}
                    className="flex items-center gap-1 rounded-md bg-red-500/10 px-2 py-0.5 text-xs text-red-600 hover:bg-red-500/20"
                  >
                    <X className="h-3 w-3" /> Remove
                  </button>
                )}
              </div>

              <div className="mt-3">
                <input 
                    type="file" 
                    id="avatar-upload" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden" 
                />
                <label 
                    htmlFor="avatar-upload"
                    className="group relative flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-black/10 bg-white p-4 transition hover:border-[#bdaf62]/50 hover:bg-[#bdaf62]/5"
                >
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-black/5 ring-1 ring-black/5 transition group-hover:scale-110 group-hover:bg-white group-hover:shadow-sm">
                        <Upload className="h-5 w-5 text-black/40 group-hover:text-[#7a6e2a]" />
                    </div>
                    <div className="text-center">
                        <p className="text-xs font-semibold text-black/70 group-hover:text-[#7a6e2a]">
                            Click to upload
                        </p>
                        <p className="text-[10px] text-black/40">
                            SVG, PNG, JPG (max 2MB)
                        </p>
                    </div>
                    {avatarFile && (
                        <div className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-emerald-500/10 py-1 text-center text-[10px] font-medium text-emerald-700">
                           {avatarFile.name} selected
                        </div>
                    )}
                </label>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl bg-white p-5 ring-1 ring-black/10 shadow-xl"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold">Edit Details</h2>
                <p className="text-sm text-black/60">Keep it clean — everything is a string.</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onReset}
                  disabled={!dirty || saving}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium ring-1 transition',
                    !dirty || saving
                      ? 'bg-black/5 text-black/40 ring-black/10'
                      : 'bg-white text-black/80 ring-black/10 hover:bg-black/5'
                  )}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>

                <button
                  type="button"
                  onClick={onSave}
                  disabled={!canSave}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold ring-1 transition',
                    !canSave
                      ? 'bg-[#bdaf62]/15 text-[#7a6e2a]/50 ring-[#bdaf62]/30'
                      : 'bg-[#bdaf62]/20 text-[#6a5f1f] ring-[#bdaf62]/40 hover:bg-[#bdaf62]/25'
                  )}
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save changes
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Field
                icon={<User className="h-4 w-4" />}
                label="First Name"
                value={form.firstName}
                onChange={(v) => setField('firstName', v)}
                placeholder="Enter first name"
                error={errors.firstName}
                loading={loading}
              />

              <Field
                icon={<User className="h-4 w-4" />}
                label="Last Name"
                value={form.lastName}
                onChange={(v) => setField('lastName', v)}
                placeholder="Enter last name"
                loading={loading}
              />

              <Field
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={form.email}
                onChange={(v) => setField('email', v)}
                placeholder="you@example.com"
                error={errors.email}
                loading={loading}
              />

              <Field
                icon={<Phone className="h-4 w-4" />}
                label="Phone"
                value={form.phone}
                onChange={(v) => setField('phone', v)}
                placeholder="+91..."
                loading={loading}
              />

              <Field
                icon={<Building2 className="h-4 w-4" />}
                label="Company Name"
                value={form.companyName}
                onChange={(v) => setField('companyName', v)}
                placeholder="Your company"
                loading={loading}
              />

              <Field
                icon={<Briefcase className="h-4 w-4" />}
                label="Industry"
                value={form.industry}
                onChange={(v) => setField('industry', v)}
                placeholder="e.g. Marketing"
                loading={loading}
              />

              <div className="md:col-span-2">
                <Field
                  icon={<Globe className="h-4 w-4" />}
                  label="Website"
                  value={form.website}
                  onChange={(v) => setField('website', v)}
                  placeholder="https://your-site.com"
                  error={errors.website}
                  loading={loading}
                />
              </div>
            </div>

            {/* Animated status / toast */}
            <div className="mt-5">
              <AnimatePresence>
                {Object.keys(errors).length > 0 && dirty && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="rounded-2xl bg-red-500/10 p-4 ring-1 ring-red-500/25"
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 text-red-500/70" />
                      <div>
                        <div className="text-sm font-semibold text-red-700">Fix these before saving</div>
                        <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-red-700/80">
                          {Object.entries(errors).map(([k, v]) => (
                            <li key={k}>
                              <span className="capitalize">{k}</span>: {v}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {toast && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={cn(
                      'mt-3 rounded-2xl p-4 ring-1',
                      toast.type === 'success'
                        ? 'bg-emerald-500/10 ring-emerald-500/25'
                        : 'bg-red-500/10 ring-red-500/25'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {toast.type === 'success' ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      )}
                      <div className="text-sm font-medium text-black/80">{toast.msg}</div>
                      <button
                        className="ml-auto rounded-xl bg-black/5 px-3 py-1 text-xs text-black/70 ring-1 ring-black/10 hover:bg-black/10"
                        onClick={() => setToast(null)}
                      >
                        Dismiss
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small UI helpers ---------- */

function Field(props: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  loading?: boolean;
}) {
  const { icon, label, value, onChange, placeholder, error, loading } = props;

  return (
    <div className="group rounded-2xl bg-black/3 p-4 ring-1 ring-black/10 transition hover:bg-black/5">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-black/60">
        <span className="grid h-7 w-7 place-items-center rounded-xl bg-black/5 ring-1 ring-black/10 text-black/70">
          {icon}
        </span>
        {label}
      </div>

      <motion.div
        whileFocus={{ scale: 1.01 }}
        className={cn(
          'relative rounded-2xl ring-1 transition',
          error ? 'ring-red-500/30' : 'ring-black/10 group-hover:ring-black/15'
        )}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          className={cn(
            'w-full rounded-2xl bg-transparent px-4 py-3 text-sm text-black outline-none placeholder:text-black/30',
            loading && 'opacity-60'
          )}
        />
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="mt-2 text-xs text-red-700/90"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LabelRow(props: { icon: React.ReactNode; label: string; value: string }) {
  const { icon, label, value } = props;
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-black/3 px-4 py-3 ring-1 ring-black/10">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-black/5 ring-1 ring-black/10 text-black/70">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-xs font-semibold text-black/50">{label}</div>
        <div className="truncate text-sm text-black/75">{value?.trim() ? value : '—'}</div>
      </div>
    </div>
  );
}