import Navigation from "@/Layouts/Navigation";

export default function BaseLayout() {
  return (
    <>
      <header className="bg-base-300">
        <Navigation />
      </header>
      <main></main>
      <footer></footer>
    </>
  );
}
