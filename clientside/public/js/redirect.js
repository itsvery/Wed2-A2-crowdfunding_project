// Check if the current page is accessed through the file system(检查当前页面是否通过文件系统访问)
if (window.location.protocol === 'file:') {
    // Redirects to pages accessed through the server(重定向到通过服务器访问的页面)
    window.location.href = 'http://localhost:3000';
  }