import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import image from "../images/er_logo.jpeg";
import { createUser, playerLogin } from "../api";

const LoginForm = () => {
  const form = useRef();
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    const username = form.current.elements["user"].value;
    const password = form.current.elements["password"].value;
    const data = await createUser({ username, password });
    console.debug(data.status);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = form.current.elements["user"].value;
    const password = form.current.elements["password"].value;

    const data = await playerLogin({ username, password });
    if (data.error) {
      console.log(data.error);
      return;
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      //sessionStorage.setItem('token', data.token);
      //let fecha = new Date();
      //fecha.setTime(fecha.getTime() + (3600*1000));
      //document.cookie = `token=${data.token}; expires=${fecha.toUTCString()}`;

      navigate("/home");
    }
  };

  return (
    <Container id="main-container" className="d-grid h-100">
      <Form
        ref={form}
        onSubmit={handleSubmit}
        id="sign-in-form"
        className="w-100 text-center"
      >
        <img
          src={image}
          width="1000"
          height="1000"
          alt="Escape from Reality Logo"
          className="login-logo mb-4"
        />
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Username"
            name="user"
            required
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>
        <Button className="login-button w-100" type="submit" variant="primary">
          Login
        </Button>
        <Button
          className="register-button w-100"
          onClick={register}
          variant="primary"
        >
          Register
        </Button>
      </Form>
    </Container>
  );
};
export default LoginForm;
