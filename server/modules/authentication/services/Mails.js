const Mailer = require("../../../services/Mailer");
const UsersRepository = require("../../users/repository");

const sendConfirmationMail = async (userId) => {
  const user = await UsersRepository.getUserById(userId);
  const url = `${process.env.APP_DOMAIN}/email-verification?token=${user.confirmationToken}`;
  const text = `${user.firstName}, pour finaliser votre inscription, merci de cliquez sur : ${url}`;
  Mailer.sendMail({
    to: user.email,
    subject: "Finalisez votre inscription",
    text,
  });
};

module.exports = { sendConfirmationMail };
