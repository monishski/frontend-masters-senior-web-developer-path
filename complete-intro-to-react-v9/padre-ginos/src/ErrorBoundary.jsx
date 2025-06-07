import { Link } from "@tanstack/react-router";
import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // componentDidMount() {}

  // componentWillUnmount() {}

  // componentDidUpdate() {}

  componentDidCatch(error, info) {
    // Send to TrackJS/Sentry
    console.error("ErrorBoundary caught some stupid error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Uh oh!</h2>
          <p>
            There was an error with this pages.
            <Link to="/">Click here</Link> to go back to the home page.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
