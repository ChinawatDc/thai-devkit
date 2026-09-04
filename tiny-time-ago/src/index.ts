export function timeAgo(date: Date | string | number): string {
  const time = new Date(date).getTime();
  if (isNaN(time)) throw new Error("Invalid date");

  const now = Date.now();
  const diffInSeconds = Math.floor((now - time) / 1000);

  // Future dates (optional support)
  if (diffInSeconds < 0) return "in the future";
  
  if (diffInSeconds < 60) return "just now";
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

export function timeUntil(date: Date | string | number): string {
  const targetTime = new Date(date).getTime();
  if (isNaN(targetTime)) throw new Error("Invalid date");

  const now = Date.now();
  const diffInSeconds = Math.floor((targetTime - now) / 1000);

  if (diffInSeconds < 0) return "already passed";
  if (diffInSeconds < 60) return `in ${diffInSeconds} seconds`;
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `in ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `in ${diffInHours} hour${diffInHours > 1 ? 's' : ''}`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `in ${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
}
