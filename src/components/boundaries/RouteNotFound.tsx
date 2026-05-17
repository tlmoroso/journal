import { Link } from '@tanstack/react-router';

export function RouteNotFound() {
  return (
    <section>
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <p>
        <Link to="/">Back to home</Link>
      </p>
    </section>
  );
}
