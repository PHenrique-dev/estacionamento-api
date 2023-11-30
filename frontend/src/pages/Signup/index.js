import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Butoon";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { postFunctio } from "../../hooks/APIServices";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function btnPost(){
    postFunctio()
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  const { signup } = useAuth();

  const handleSignup = () => {
    if (!email | !confirmpassword | !password) {
      setError("Preencha todos os campos");
      return;
    } else if (confirmpassword !== password) {
      setError("Os e-mails não são iguais");
      return;
    }

    const res = signup(email, password);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadatrado com sucesso!");
    navigate("/");
  };

  return (
    <C.Container>
      <C.Content>
      <C.Label>SISTEMA DE LOGIN</C.Label>
        <Input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => [setName(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={password}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Confirme sua Senha"
          value={confirmpassword}
          onChange={(e) => [setConfirmpassword(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Inscrever-se" onClick={() =>{
          btnPost();
          handleSignup();} }/>
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;