const staticPaths = new Set(["/","/_headers","/favicon.svg","/food-drinks/","/manifest.json","/q-manifest.json","/reciepts/","/robots.txt","/service-worker.js","/settings/","/sitemap.xml","/tobacco/","/user/"]);
function isStaticPath(p) {
  if (p.startsWith("/build/")) {
    return true;
  }
  if (p.startsWith("/assets/")) {
    return true;
  }
  if (staticPaths.has(p)) {
    return true;
  }
  return false;
}
export { isStaticPath };