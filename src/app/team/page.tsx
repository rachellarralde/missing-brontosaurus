interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "NAIAD",
    role: "Founder",
    image: "/brooke.png",
  },
  {
    name: "sigill",
    role: "Director of the Hunt",
    image: "/kevin.png",
  },
  {
    name: "SCHROEDS",
    role: "Archeologist",
    image: "/SCHROEDS-disco.jpg",
  },
  {
    name: "Desmdy",
    role: "Lost & Found Events",
    image: "/desmdy.png",
  },
  {
    name: "RVCHL",
    role: "Web Developer",
    image: "/RVCHL.JPG",
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Team</h1>

        <div className="space-y-6 text-muted-foreground">
          <p className="text-lg">
            Meet the people behind Missing Brontosaurus.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {teamMembers.map((member) => (
              <div key={member.name} className="space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={`${member.name} profile`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted rounded-full"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm">{member.role}</p>
              </div>
            ))}
          </div>

          <p className="text-sm italic mt-12">
            🚧 Team information is being updated. More details coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
