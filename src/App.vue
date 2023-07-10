<template>
<div class="nav-container">
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
</div>

  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav-container{
  background-color: #333;
  text-align: center;
}
.nav-container nav {
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
  width: 50%;
  overflow: hidden;
  background-color: #333;
}

.nav-container nav a {
  font-weight: bold;
  color: #2c3e50;
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
.nav-container nav a:hover {
  background-color: #111;
}
.nav-container nav a.router-link-exact-active {
  color: #42b983;
}
body{
  margin: 0px;
}

</style>
