function ProfileCard({ name, avatar, className = "" }) {
  return (
    <div
      className={`flex items-center justify-between w-50  p-2 border-2 border-foreground/20 rounded-xl bg-background text-foreground border border-border hover:border-foreground/40 transition-colors ${className}`}
    > 
      <span className="text-foreground/60 font-medium">
        Hello, <span className="font-semibold text-foreground">{name}</span>
      </span>
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
        <img
          src="/profile.jpg"
          alt={`${name}'s profile`}
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default ProfileCard;
