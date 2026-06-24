function showName() {

    const name =
        document.getElementById("name").value;

    console.log("Entered Name:", name);

    document.getElementById("result").innerText =
        `Hello ${name}! Welcome to my website.`;
}