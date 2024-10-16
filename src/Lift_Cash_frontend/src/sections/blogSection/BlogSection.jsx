import "./BlogSection.css"; // Import custom Tailwind CSS file

const BlogSection = () => {
  // Sample data for recent news
  const blogs = [
    {
      title: "Freeos Unchained",
      date: "Mon Mar 18 2024",
      image:
        "https://plus.unsplash.com/premium_photo-1681487464375-7cde580bf4ec?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "No content available",
    },
    {
      title: "Revolutionising DAO Governance with Fractal Sortition",
      date: "Thu Dec 14 2023",
      image:
        "https://plus.unsplash.com/premium_photo-1681487464375-7cde580bf4ec?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "No content available",
    },
    {
      title:
        "Implementing a Sortition-based DAO for Policymaking and AI Governance",
      date: "Sat Jun 24 2023",
      image:
        "https://plus.unsplash.com/premium_photo-1681487464375-7cde580bf4ec?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "No content available",
    },
  ];

  return (
    <section className="blog-section-main">
      <div className="text-center">
        <h1 className="section-title-h1">Our Blogs</h1>
        <h2 className="section-title-h2">Our Recent News</h2>
        <p className="section-subtitle ">
          There are many variations of passages of Lorem Ipsum <br /> available
          but the majority have suffered alteration in some form.
        </p>
      </div>
      <div className="blog-grid">
        {blogs.map((blog, index) => (
          <div key={index} className="blog-card">
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <span className="blog-date">{blog.date}</span>
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-description">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
