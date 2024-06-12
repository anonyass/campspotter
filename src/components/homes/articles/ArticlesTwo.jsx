import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ArticlesTwo() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/latestblogs");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="layout-pt-xl layout-pb-xl bg-accent-1 ">
      <div className="container">
        <div className="row justify-between items-end y-gap-10">
          <div className="col-auto">
            <h2 className="text-30 md:text-24 text-white">
              Camps Articles
            </h2>
          </div>

          <div className="col-auto">
            <Link to={"/blog"} className="buttonArrow d-flex items-center text-white">
              <span>See all</span>
              <i className="icon-arrow-top-right text-16 ml-10"></i>
            </Link>
          </div>
        </div>

        <div className="row y-gap-30 pt-40 sm:pt-20">
          {blogs.map((blog, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <Link to={`/article/${blog._id}`} className="blogCard -type-1">
                <div className="blogCard__image ratio ratio-41:30">
                  <img src={`http://localhost:5000/${blog.coverImage}`} alt="image" className="img-ratio rounded-12" />
                  <div className="blogCard__badge">{blog.type}</div>
                </div>

                <div className="blogCard__content mt-30">
                  <div className="blogCard__info text-14">
                    <div className="lh-13 text-white">{formatDate(blog.date)}</div>
                    <div className="blogCard__line"></div>
                    <div className="lh-13 text-white">By {blog.creatorName ? blog.creatorName : 'Anonymous'}</div>
                  </div>

                  <h3 className="blogCard__title text-white text-18 fw-500 mt-10">
                    {blog.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
