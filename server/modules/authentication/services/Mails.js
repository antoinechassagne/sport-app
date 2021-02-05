const Mailer = require("../../../services/Mailer");
const UsersRepository = require("../../users/repository");

exports.sendConfirmationMail = async (userId) => {
  const user = await UsersRepository.getUserById(userId);
  const url = `${process.env.APP_DOMAIN}/email-verification?token=${user.confirmationToken}`;
  const text = `${user.firstName}, pour finaliser votre inscription, merci de cliquez sur : ${url}`;
  Mailer.sendMail({
    to: user.email,
    subject: "Sport App - Finalisez votre inscription",
    text,
  });
};

exports.sendResetPasswordEmail = async (token) => {
  const user = await UsersRepository.getUserByResetToken(token);
  const url = `${process.env.APP_DOMAIN}/reset-password?token=${token}`;
  const text = `${user.firstName}, pour réinitialiser votre mot de passe, merci de cliquez sur : ${url}`;
  Mailer.sendMail({
    to: user.email,
    subject: "Sport App - Réinitialisez votre mot de passe",
    text,
  });
};