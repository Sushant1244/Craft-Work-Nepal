import React, { useState } from "react";
import { Eye, EyeOff, Shield, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Adminlogin.css";
import authAPI from "../../services/authApi";

// Custom useForm hook
const useCustomForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (onSubmit) => {
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};

// Validation function
const validateForm = (values) => {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

// Main AdminLogin Component
const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    useCustomForm({ email: "", password: "" }, validateForm);

  const onSubmit = async (formData) => {
    try {
      setLoginStatus("loading");
      setLoginMessage("");
      
      // Call the auth API
      const response = await authAPI.login(formData.email, formData.password);
      
      setLoginStatus("success");
      setLoginMessage("Login successful! Redirecting...");
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setLoginStatus("error");
      const errorMsg = error?.message || "Invalid email or password";
      setLoginMessage(errorMsg);
      console.error("Login error:", error);
    }
  };

  const handleFormSubmit = () => {
    setLoginStatus("");
    setLoginMessage("");
    handleSubmit(onSubmit);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="gradient-overlay"></div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <Shield className="logo-icon" size={32} />
          </div>
          <h1 className="login-title">Admin Portal</h1>
          <p className="login-subtitle">Sign in to access the dashboard</p>
        </div>

        <div className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-container">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? "input-error" : ""}`}
                placeholder="Enter your email"
                disabled={isSubmitting || loginStatus === "loading"}
              />
            </div>
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-container">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? "input-error" : ""}`}
                placeholder="Enter your password"
                disabled={isSubmitting || loginStatus === "loading"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                disabled={isSubmitting || loginStatus === "loading"}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" className="checkbox" disabled={isSubmitting || loginStatus === "loading"} />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>

          <button
            type="button"
            onClick={handleFormSubmit}
            disabled={isSubmitting || loginStatus === "loading"}
            className={`submit-button ${isSubmitting || loginStatus === "loading" ? "loading" : ""}`}>
            {isSubmitting || loginStatus === "loading" ? "Signing in..." : "Sign In"}
          </button>

          {loginStatus === "success" && (
            <div className="status-message success">
              {loginMessage}
            </div>
          )}

          {loginStatus === "error" && (
            <div className="status-message error">
              {loginMessage}
            </div>
          )}
        </div>

        <div className="login-footer">
          <p>© 2025 KalaBazzer Admin Portal. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
