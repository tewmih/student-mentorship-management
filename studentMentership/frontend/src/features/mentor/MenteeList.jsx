import ProfileCard from "../../ui/ProfileCard";

const profiles = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://placehold.co/48x48/667EEA/FFFFFF?text=JD",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://placehold.co/48x48/5A67D8/FFFFFF?text=JS",
  },
  {
    id: 3,
    name: "Peter Jones",
    avatar: "https://placehold.co/48x48/4C51BF/FFFFFF?text=PJ",
  },
  {
    id: 4,
    name: "Mary Williams",
    avatar: "https://placehold.co/48x48/3B82F6/FFFFFF?text=MW",
  },
];

export function MenteeList({ profiles }) {
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">My Mentee</h2>
      <div className="space-y-4">
        {profiles.map((mentee) => (
          <ProfileCard
            key={mentee.id}
            name={mentee.name}
            avatar={mentee.avatar}
          />
        ))}
      </div>
    </div>
  );
}
