import { useState } from "react";
import { Lift_Cash_backend } from "declarations/Lift_Cash_backend";

function App() {
  const [greeting, setGreeting] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    Lift_Cash_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" className="mx-auto my-4" />
      <br />
      <br />
      <form
        action="#"
        onSubmit={handleSubmit}
        className="flex flex-col items-center"
      >
        <label htmlFor="name" className="mb-2 text-lg font-semibold">
          Enter your name:
        </label>
        <input
          id="name"
          alt="Name"
          type="text"
          className="border border-gray-300 rounded-md p-2 mb-4 w-64"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-200"
        >
          Click Me!
        </button>
      </form>
      <section className="mt-4 text-lg">{greeting}</section>
    </main>
  );
}

export default App;
