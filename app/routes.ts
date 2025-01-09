import { type RouteConfig, index,route } from "@react-router/dev/routes";

export default [

    index("routes/Signup.jsx"),
    index("routes/Login.jsx"),
    route("/blogs","routes/Blogs.jsx"),
    route("/blogs/about","routes/About.jsx"),
    route("/blogs/famous","routes/Famous.jsx"),
    route("/blogs/create","routes/Posts.jsx")

] satisfies RouteConfig;
 
