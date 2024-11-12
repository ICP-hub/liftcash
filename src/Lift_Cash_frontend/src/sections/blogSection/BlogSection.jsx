import "./BlogSection.css"; // Import custom Tailwind CSS file
import { blogs } from "../../assets/data/Blogs";
const BlogSection = () => {
  return (
    <section className="blog-section-main" id="blog">
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
            <a href={blog.link} target="_blank">
              <img src={blog.image} alt={blog.title} className="blog-image" />
              <div className="blog-content">
                <span className="blog-date">{blog.date}</span>
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-description">{blog.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
