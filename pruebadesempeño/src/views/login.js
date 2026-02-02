export function LoginView() {
  return `
  <section class="sectionLogin">
    <article class="articleLogin">
      <form class="loginForm" id="loginForm">
        <div class="articleHigh">
          <h2>Welcome back</h2>
          <p>Enter your credentials to access the platform</p>
        </div>

        <div class="articleMid">
          <label>Email</label>
          <input id="email" class="input" type="email" required>
        </div>

        <div class="articleMid2">
          <label>Password</label>
          <input id="password" class="input" type="password" required>
        </div>

        <div class="articleLow">
          <button class="btn btn-primary" type="submit">Sign In</button>
          <p>Don't have an account?
            <a href="#" data-link="/register">register</a>
          </p>
        </div>
      </form>
    </article>
  </section>
  `;
}
