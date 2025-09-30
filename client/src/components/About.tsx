import profileUrl from "@assets/profile_1759214045918.jpg";

export default function About() {
  return (
    <section id="about" className="py-24 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Meet Sarika Agrawal
            </h2>
            <h3 className="text-2xl text-primary font-semibold mb-6">
              Your Dedicated Career Coach and Guide
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
              <p>
                As a dedicated Career Coach and Guide, Sarika Agrawal founded DreamBridge to help individuals navigate the often-complex journey from education to career. She is passionate about empowering her clients to bridge the gap between their aspirations and real-world achievements.
              </p>
              <p>
                With extensive experience in career counseling, admissions processes, and conducting impactful workshops, Sarika provides the tools, clarity, and confidence students and professionals need to succeed. Her personalized approach ensures that every individual receives a roadmap tailored to their unique strengths and goals.
              </p>
              <p>
                Whether you're a student exploring career options, a professional seeking growth, or an institution looking for expert guidance, DreamBridge is here to support you every step of the way.
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-vibrant-orange to-vibrant-yellow opacity-20 blur-2xl rounded-full" />
              <img
                src={profileUrl}
                alt="Sarika Agrawal"
                className="relative rounded-2xl shadow-2xl w-full max-w-md border-4 border-card-border"
                data-testid="img-profile"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
