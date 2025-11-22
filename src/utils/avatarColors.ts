export const avatarGradients = [
  'from-green-800 to-green-900',
  'from-blue-800 to-blue-900',
  'from-purple-800 to-purple-900',
  'from-pink-800 to-pink-900',
  'from-red-800 to-red-900',
  'from-orange-800 to-orange-900',
  'from-yellow-700 to-yellow-800',
  'from-teal-800 to-teal-900',
  'from-cyan-800 to-cyan-900',
  'from-indigo-800 to-indigo-900',
  'from-violet-800 to-violet-900',
  'from-fuchsia-800 to-fuchsia-900',
  'from-rose-800 to-rose-900',
  'from-emerald-800 to-emerald-900',
  'from-lime-700 to-lime-800',
  'from-sky-800 to-sky-900',
  'from-slate-700 to-slate-800',
];

export const getAvatarGradient = (username: string): string => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  const index = Math.abs(hash) % avatarGradients.length;
  return avatarGradients[index];
};
