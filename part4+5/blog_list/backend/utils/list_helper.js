const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce((total, blog) => total + blog.likes, 0);
};

const mostBlogs = (blogs) => {
  const authorBlogCounts = () => {
    const counts = {};
    blogs.forEach(blog => {
      counts[blog.author] = counts[blog.author] ? counts[blog.author] + 1 : 1;
    });
    return counts;
  };

  const maxAuthorBlogCount = (counts) => {
    let maxEntry = {
      author: '',
      blogs: -1
    };

    Object.entries(counts).forEach(([author, blogs]) => {
      if (blogs > maxEntry.blogs) {
        maxEntry = { author, blogs };
      }
    });

    return maxEntry;
  };

  return maxAuthorBlogCount(authorBlogCounts());
};

const mostLikes = (blogs) => {
  const authorLikeCounts = () => {
    const counts = {};
    blogs.forEach(blog => {
      if (counts[blog.author]) {
        counts[blog.author] += blog.likes;
      } else {
        counts[blog.author] = blog.likes;
      }
    });
    return counts;
  };

  const maxAuthorLikeCount = (counts) => {
    let maxEntry = {
      author: '',
      likes: -1
    };

    Object.entries(counts).forEach(([author, likes]) => {
      if (likes > maxEntry.likes) {
        maxEntry = { author, likes };
      }
    });

    return maxEntry;
  };

  return maxAuthorLikeCount(authorLikeCounts());
};

module.exports = {
  totalLikes,
  mostBlogs,
  mostLikes
};