import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailprovider } from "./implementations/SESMailProvider";

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailprovider),
};

container.registerInstance<IMailProvider>(
    "MailProvider",
    mailProvider[process.env.MAIL_PROVIDER]
);
