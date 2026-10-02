import { useState } from "react";
import type {
  ChangeEvent,
  ClipboardEvent,
  DragEvent,
  FocusEvent,
  //FormEvent,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  TouchEvent,
  WheelEvent,
} from "react";
//import type { FormEvent } from "react";
import type { SyntheticEvent } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("India");
  const [agree, setAgree] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [message, setMessage] = useState("Interact with the events below");

  /* ---------------------------------
     Change Event
  ---------------------------------- */

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log("Search:", event.target.value);
    setSearch(event.target.value);
    setMessage(`Input changed: ${event.target.value}`);
  };

  /* ---------------------------------
     Mouse Event - Click
  ---------------------------------- */

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
    console.log("Button clicked");
    console.log(event.currentTarget);
    setMessage("Button clicked");
  };

  /* ---------------------------------
     Mouse Event - Double Click
  ---------------------------------- */

  const handleDoubleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    console.log("Double clicked");
    console.log("Click count:", event.detail);
    setMessage("Button double clicked");
  };

  /* ---------------------------------
     Mouse Enter
  ---------------------------------- */

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>): void => {
    console.log("Mouse entered");
    console.log(event.currentTarget);
    setMessage("Mouse entered the box");
  };

  /* ---------------------------------
     Mouse Leave
  ---------------------------------- */

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>): void => {
    console.log("Mouse left");
    console.log(event.currentTarget);
    setMessage("Mouse left the box");
  };

  /* ---------------------------------
     Mouse Down
  ---------------------------------- */

  const handleMouseDown = (event: MouseEvent<HTMLButtonElement>): void => {
    console.log("Mouse down");
    console.log(event.currentTarget);
    setMessage("Mouse button pressed");
  };

  /* ---------------------------------
     Mouse Up
  ---------------------------------- */

  const handleMouseUp = (event: MouseEvent<HTMLButtonElement>): void => {
    console.log("Mouse up");
    console.log(event.currentTarget);
    setMessage("Mouse button released");
  };

  /* ---------------------------------
     Context Menu
  ---------------------------------- */

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    console.log("Right click");
    console.log(event.currentTarget);
    setMessage("Right-click detected");
  };

  /* ---------------------------------
     Keyboard Event - Key Down
  ---------------------------------- */

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    console.log("Key down:", event.key);

    if (event.key === "Enter") {
      setMessage("Enter key pressed");
    } else {
      setMessage(`Key down: ${event.key}`);
    }
  };

  /* ---------------------------------
     Keyboard Event - Key Up
  ---------------------------------- */

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>): void => {
    console.log("Key up:", event.key);
    setMessage(`Key released: ${event.key}`);
  };

  /* ---------------------------------
     Focus Event
  ---------------------------------- */

  const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
    console.log("Input focused");
    console.log(event.currentTarget);
    setMessage("Input received focus");
  };

  /* ---------------------------------
     Blur Event
  ---------------------------------- */

  const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
    console.log("Input lost focus");
    console.log(event.currentTarget);
    setMessage("Input lost focus");
  };

  /* ---------------------------------
     Select Change Event
  ---------------------------------- */

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    console.log("Country:", event.target.value);
    setCountry(event.target.value);
    setMessage(`Country selected: ${event.target.value}`);
  };

  /* ---------------------------------
     Checkbox Change Event
  ---------------------------------- */

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log("Checked:", event.target.checked);
    setAgree(event.target.checked);
    setMessage(
      event.target.checked ? "Checkbox checked" : "Checkbox unchecked",
    );
  };

  /* ---------------------------------
     Form Submit Event
  ---------------------------------- */

  //const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
  //const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSubmittedName(search);
    setMessage("Form submitted successfully");
    console.log("Form submitted");
  };

  /* ---------------------------------
     Drag Start
  ---------------------------------- */

  const handleDragStart = (event: DragEvent<HTMLDivElement>): void => {
    console.log("Drag started");
    event.dataTransfer.setData("text/plain", "React TypeScript");
    setMessage("Drag started");
  };

  /* ---------------------------------
     Drag Over
  ---------------------------------- */

  const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    console.log("Drag over");
    setMessage("Dragging over drop area");
  };

  /* ---------------------------------
     Drop
  ---------------------------------- */

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();

    const data = event.dataTransfer.getData("text/plain");

    console.log("Dropped:", data);
    setMessage(`Dropped: ${data}`);
  };

  /* ---------------------------------
     Clipboard - Copy
  ---------------------------------- */

  const handleCopy = (event: ClipboardEvent<HTMLInputElement>): void => {
    console.log("Copy event");
    console.log(event.currentTarget);
    setMessage("Text copied");
  };

  /* ---------------------------------
     Clipboard - Paste
  ---------------------------------- */

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>): void => {
    console.log("Paste event");
    console.log(event.currentTarget);
    setMessage("Text pasted");
  };

  /* ---------------------------------
     Wheel Event
  ---------------------------------- */

  const handleWheel = (event: WheelEvent<HTMLDivElement>): void => {
    console.log("Wheel:", event.deltaY);
    setMessage(`Mouse wheel: ${Math.round(event.deltaY)}`);
  };

  /* ---------------------------------
     Touch Event
  ---------------------------------- */

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>): void => {
    console.log("Touch started");
    console.log("Touches:", event.touches.length);
    setMessage("Touch started");
  };

  /* ---------------------------------
     Pointer Event
  ---------------------------------- */

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    console.log("Pointer type:", event.pointerType);
    setMessage(`Pointer: ${event.pointerType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-sm font-medium text-indigo-300">
            React + TypeScript
          </div>

          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            React Events
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
            Learn how to handle different React events using TypeScript event
            types.
          </p>
        </div>

        {/* Event Status */}

        <div className="mb-8 rounded-2xl border border-indigo-400/20 bg-white/5 p-5 shadow-xl backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
            Current Event
          </p>

          <p className="mt-2 text-lg font-semibold text-white">{message}</p>
        </div>

        {/* Change Event */}

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                ChangeEvent
              </span>

              <h2 className="mt-3 text-xl font-bold text-slate-800">
                1. Input Change Event
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                ChangeEvent&lt;HTMLInputElement&gt;
              </p>
            </div>

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Type something..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />

            <p className="mt-3 text-sm text-slate-500">
              Value:{" "}
              <strong className="text-indigo-600">{search || "Empty"}</strong>
            </p>
          </section>

          {/* Mouse Events */}

          <section className="rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                MouseEvent
              </span>

              <h2 className="mt-3 text-xl font-bold text-slate-800">
                2. Mouse Events
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                MouseEvent&lt;HTMLButtonElement&gt;
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleButtonClick}
                className="rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
              >
                Click
              </button>

              <button
                onDoubleClick={handleDoubleClick}
                className="rounded-xl bg-purple-600 px-4 py-2.5 font-semibold text-white transition hover:bg-purple-700 active:scale-95"
              >
                Double Click
              </button>

              <button
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                className="rounded-xl bg-cyan-600 px-4 py-2.5 font-semibold text-white transition hover:bg-cyan-700"
              >
                Mouse Down / Up
              </button>
            </div>
          </section>

          {/* Mouse Enter / Leave */}

          <section className="rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                MouseEvent
              </span>

              <h2 className="mt-3 text-xl font-bold text-slate-800">
                3. Mouse Enter / Leave
              </h2>
            </div>

            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onContextMenu={handleContextMenu}
              className="flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 text-center font-semibold text-indigo-700 transition hover:bg-indigo-100"
            >
              Move mouse here
              <br />
              or right-click
            </div>
          </section>

          {/* Keyboard */}

          <section className="rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                KeyboardEvent
              </span>

              <h2 className="mt-3 text-xl font-bold text-slate-800">
                4. Keyboard Events
              </h2>

              <p className="mt-1 text-sm text-slate-500">KeyDown / KeyUp</p>
            </div>

            <input
              type="text"
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              placeholder="Press any key..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />

            <p className="mt-3 text-sm text-slate-500">
              Try pressing <strong>Enter</strong>, letters, numbers or arrow
              keys.
            </p>
          </section>

          {/* Focus / Blur */}

          <section className="rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-700">
                FocusEvent
              </span>

              <h2 className="mt-3 text-xl font-bold text-slate-800">
                5. Focus / Blur
              </h2>
            </div>

            <input
              type="text"
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Click inside this input"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            />

            <p className="mt-3 text-sm text-slate-500">
              Focus = enter the input
              <br />
              Blur = leave the input
            </p>
          </section>

          {/* Select */}

          <section className="rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-700">
                ChangeEvent
              </span>

              <h2 className="mt-3 text-xl font-bold text-slate-800">
                6. Select Change
              </h2>
            </div>

            <select
              value={country}
              onChange={handleCountryChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            >
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
              <option>Canada</option>
              <option>Australia</option>
            </select>

            <p className="mt-3 text-sm text-slate-500">
              Selected:
              <strong className="ml-2 text-teal-600">{country}</strong>
            </p>
          </section>

          {/* Checkbox */}

          <section className="rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                ChangeEvent
              </span>

              <h2 className="mt-3 text-xl font-bold text-slate-800">
                7. Checkbox Event
              </h2>
            </div>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={agree}
                onChange={handleCheckboxChange}
                className="h-5 w-5 accent-indigo-600"
              />

              <span className="font-medium text-slate-700">
                I agree to the terms
              </span>
            </label>

            <p className="mt-4 text-sm text-slate-500">
              Status:
              <strong
                className={`ml-2 ${agree ? "text-green-600" : "text-red-600"}`}
              >
                {agree ? "Checked" : "Unchecked"}
              </strong>
            </p>
          </section>

          {/* Form */}

          <section className="rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                FormEvent
              </span>

              <h2 className="mt-3 text-xl font-bold text-slate-800">
                8. Form Submit
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700 active:scale-[0.99]"
              >
                Submit Form
              </button>
            </form>

            {submittedName && (
              <p className="mt-3 text-sm text-green-600">
                Submitted: {submittedName}
              </p>
            )}
          </section>

          {/* Drag and Drop */}

          <section className="rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                DragEvent
              </span>

              <h2 className="mt-3 text-xl font-bold text-slate-800">
                9. Drag & Drop
              </h2>
            </div>

            <div
              draggable
              onDragStart={handleDragStart}
              className="mb-4 cursor-grab rounded-xl bg-amber-500 p-4 text-center font-bold text-white active:cursor-grabbing"
            >
              Drag Me
            </div>

            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="rounded-xl border-2 border-dashed border-amber-400 bg-amber-50 p-8 text-center font-semibold text-amber-700"
            >
              Drop Here
            </div>
          </section>

          {/* Clipboard */}

          <section className="rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">
                ClipboardEvent
              </span>

              <h2 className="mt-3 text-xl font-bold text-slate-800">
                10. Clipboard Events
              </h2>
            </div>

            <input
              type="text"
              defaultValue="Copy or paste this text"
              onCopy={handleCopy}
              onPaste={handlePaste}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />

            <p className="mt-3 text-sm text-slate-500">
              Try Ctrl+C and Ctrl+V.
            </p>
          </section>

          {/* Wheel */}

          <section className="rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
                WheelEvent
              </span>

              <h2 className="mt-3 text-xl font-bold text-slate-800">
                11. Mouse Wheel
              </h2>
            </div>

            <div
              onWheel={handleWheel}
              className="flex h-28 items-center justify-center rounded-xl border-2 border-dashed border-rose-300 bg-rose-50 text-center font-semibold text-rose-700"
            >
              Move mouse wheel here
            </div>
          </section>

          {/* Touch */}

          <section className="rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <span className="rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-bold text-fuchsia-700">
                TouchEvent
              </span>

              <h2 className="mt-3 text-xl font-bold text-slate-800">
                12. Touch Event
              </h2>
            </div>

            <div
              onTouchStart={handleTouchStart}
              className="flex h-28 items-center justify-center rounded-xl border-2 border-dashed border-fuchsia-300 bg-fuchsia-50 text-center font-semibold text-fuchsia-700"
            >
              Touch this area
              <br />
              on a mobile device
            </div>
          </section>

          {/* Pointer */}

          <section className="rounded-2xl bg-white p-6 shadow-xl lg:col-span-2">
            <div className="mb-5">
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                PointerEvent
              </span>

              <h2 className="mt-3 text-xl font-bold text-slate-800">
                13. Pointer Event
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Works with mouse, touch and pen/stylus.
              </p>
            </div>

            <div
              onPointerDown={handlePointerDown}
              className="flex h-28 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-center font-bold text-white shadow-lg transition hover:scale-[1.01]"
            >
              Click / Touch / Use Pen
            </div>
          </section>
        </div>

        {/* Summary */}

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-xl">
          <h2 className="mb-5 text-xl font-bold text-slate-800">
            React + TypeScript Event Types
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "ChangeEvent",
              "MouseEvent",
              "KeyboardEvent",
              "FocusEvent",
              "FormEvent",
              "DragEvent",
              "ClipboardEvent",
              "WheelEvent",
              "TouchEvent",
              "PointerEvent",
            ].map((eventType) => (
              <div
                key={eventType}
                className="rounded-xl bg-slate-50 px-4 py-3 font-mono text-sm font-semibold text-indigo-700"
              >
                {eventType}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}

        <div className="mt-8 text-center text-sm text-slate-500">
          React + TypeScript Event Handling
        </div>
      </div>
    </div>
  );
}

export default App;
