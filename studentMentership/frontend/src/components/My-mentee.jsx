import ProfileCard from "./Profile-car.jsx";

function MenteeList({ mentees }) {
  return (
    <div className="max-w-md mx-auto  h-screen">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">My Mentee</h2>
      <div className="space-y-4">
        {mentees.map((mentee) => (
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

export default MenteeList;
