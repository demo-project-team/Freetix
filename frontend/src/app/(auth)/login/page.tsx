import LoginForm from "./_features/LoginForm";

// /* eslint-disable @next/next/no-img-element */
export default function LoginUp() {
  return (
    <div className="flex w-screen h-screen ">
      <div className="w-1/2 h-full  flex items-center justify-center relative">
        <section className="flex flex-col md:flex-row items-center justify-center flex-1 p-6">
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h2 className="text-5xl font-bold text-pink-500 neon-glow">
              IT WAS
              <br />
              ALL A<br />
              <span className="text-purple-500 italic">Dream</span>
            </h2>
          </div>
        </section>
      </div>
      <div className="w-1/2 h-full flex items-center justify-center relative">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-4xl font-extrabold text-center text-fuchsia-500">
              Welcome Back 😎
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
