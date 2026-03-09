import { validateCPF } from "./validateCpf"

export function validateRegister(data) {

  const errors = {}

  if (!data.name || data.name.length < 3) {
    errors.name = "Nome deve ter pelo menos 3 caracteres"
  }

  if (!data.email) {
    errors.email = "Email é obrigatório"
  } 
  else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email inválido"
  }

  if (!data.cpf) {
    errors.cpf = "CPF é obrigatório"
  }
  else if (!validateCPF(data.cpf)) {
    errors.cpf = "CPF inválido"
  }

  if (!data.password) {
    errors.password = "Senha é obrigatória"
  }
  else if (data.password.length < 6) {
    errors.password = "Senha deve ter no mínimo 6 caracteres"
  }

  return errors
}

export function validateLogin(data) {

  const errors = {}

  if (!data.email) {
    errors.email = "Email é obrigatório"
  }

  if (!data.password) {
    errors.password = "Senha é obrigatória"
  }

  return errors
}

export function validateChangePassword(data) {

  const errors = {}

  if (!data.currentPassword) {
    errors.currentPassword = "Senha atual é obrigatória"
  }

  if (!data.newPassword) {
    errors.newPassword = "Nova senha é obrigatória"
  }
  else if (data.newPassword.length < 6) {
    errors.newPassword = "Nova senha deve ter no mínimo 6 caracteres"
  }

  if (data.newPassword !== data.confirmNewPassword) {
    errors.confirmNewPassword = "As senhas não coincidem"
  }

  return errors
}