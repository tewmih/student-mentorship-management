
function ProfileCard({ name, avatar, className = "" }) {
  return (
    <div
      className={`flex items-center justify-between p-4 border-2 border-gray-300 rounded-xl bg-white hover:border-gray-400 transition-colors ${className}`}
    >
      <span className="text-gray-700 font-medium">
        Hello, <span className="font-semibold text-gray-900">{name}</span>
      </span>
      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={avatar || "/placeholder.svg"}
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