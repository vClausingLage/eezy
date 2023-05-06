import { useState } from "react";

function TestField() {
  const [input, setInput] = useState<number>();

  const submit = (e: any) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <div>
      <h1>test field</h1>
      <form onSubmit={(e) => submit(e)}>
        <label htmlFor="number">Number</label>
        <input
          type="number"
          name="number"
          id="number"
          value={String(input)}
          onChange={(e) => setInput(Number(e.target.value))}
        />
        <button onClick={(e) => submit(e)}>click</button>
      </form>
    </div>
  );
}

export default TestField;
