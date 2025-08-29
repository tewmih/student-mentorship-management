const FeaturesSection = () => {
    return (
        <div>
            <section className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
                <div className="bg-background text-foreground shadow p-6 rounded-lg text-center">
                    <div className="text-blue-500 mb-3">🎓</div>
                    <h3 className="font-semibold text-lg mb-2">
                        Expert Mentorship
                    </h3>
                    <p className="text-foreground/60 text-sm">
                        Connect with senior students who have successfully
                        navigated university life.
                    </p>
                </div>
                <div className="bg-white shadow p-6 rounded-lg text-center">
                    <div className="text-yellow-500 mb-3">🤝</div>
                    <h3 className="font-semibold text-lg mb-2">
                        Community Building
                    </h3>
                    <p className="text-foreground/60 text-sm">
                        Join study groups and connect with peers facing similar
                        challenges.
                    </p>
                </div>
                <div className="bg-white shadow p-6 rounded-lg text-center">
                    <div className="text-green-500 mb-3">📚</div>
                    <h3 className="font-semibold text-lg mb-2">
                        Academic Growth
                    </h3>
                    <p className="text-foreground/60 text-sm">
                        Access resources, study materials, and personalized
                        guidance.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default FeaturesSection;
