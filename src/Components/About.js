import  React from 'react'


const About = () => {
  return (
    <>
     <div style={{ padding: '20px' }} id='about'>
      <h1 >About iNotebook</h1>
      <p>
        Welcome to iNotebook! This application is designed to help you keep your notes organized and easily accessible. Whether you're a student, professional, or just someone who loves to jot down thoughts, iNotebook provides a seamless and intuitive way to manage your notes.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Create, edit, and delete notes</li>
        <li>Organize notes into categories</li>
        <li>Search for notes easily</li>
        <li>Access your notes from any device</li>
      </ul>
      <h2>Our Mission</h2>
      <p>
        Our mission is to provide a simple and efficient note-taking solution that helps you stay organized and productive. We believe that everyone should have access to tools that enhance their daily lives and help them achieve their goals.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions, feedback, or suggestions, feel free to contact us. We'd love to hear from you!
      </p>
      <div className="social">
      <a href='https://www.instagram.com/shivam_._.rathore/?igshid=YmMTA2M2Y%3D' target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
      <a href="https://www.linkedin.com/in/shivam-singh-rathore-17a254246/" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a> 
      <a href="https://github.com/shivam78775" target="_blank" rel="noreferrer"> <i className="fa-brands fa-github"></i></a>
      </div>
    </div>
    </>
  )
}

export default About