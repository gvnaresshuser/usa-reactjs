import React from 'react'

const ContactForm = () => {
  return (
    <div>
      <form className="simple-form">
        <input type="text" name="name" placeholder="Name" />
        <br />

        <input type="email" name="email" placeholder="Email" />
        <br />

        <textarea
          name="message"
          placeholder="Message"
          cols="30"
          rows="10"
        ></textarea>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm