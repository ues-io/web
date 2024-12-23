import { ListenerBotApi } from "@uesio/bots"

export default function request_demo(bot: ListenerBotApi) {
	const fromEmail = "info@updates.ues.io"

	const firstName = bot.params.get("firstname")
	const lastName = bot.params.get("lastname")
	const email = bot.params.get("email")
	const phone = bot.params.get("phone")
	const companyName = bot.params.get("companyname")
	const comments = bot.params.get("comments")

	const site = bot.getSession().getSite()

	const host = bot.getHostUrl()

	const nl2br = (str: string) => {
		const breakTag = "<br>"
		const replaceStr = "$1" + breakTag
		return (str + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr)
	}

	const templateParams = {
		logoUrl: host + bot.getFileUrl("uesio/core.logo", ""),
		logoAlt: "ues.io",
		logoWidth: "40",
		footerText: "ues.io - Your app platform",
	}

	// Send the email to sales so we can process this.
	const notifyUsBodyText = `A demo request was submitted on the ues.io website.

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Company Name: ${companyName}
Comments: ${comments}

Domain: ${site.getDomain()}

Cheers!

The team at ues.io`

	const notifyUsParams = {
		...templateParams,
		titleText: "Somebody wants a demo!",
		bodyText: notifyUsBodyText,
	}

	bot.runIntegrationAction("uesio/appkit.resend", "sendemail", {
		to: "sales@ues.io",
		from: fromEmail,
		subject: `New demo request: ${firstName} ${lastName}`,
		html: bot.mergeTemplateFile(
			"uesio/appkit.emailtemplates",
			"templates/genericmessage.html",
			{
				...notifyUsParams,
				bodyText: nl2br(notifyUsBodyText),
			}
		),
		text: bot.mergeTemplateFile(
			"uesio/appkit.emailtemplates",
			"templates/genericmessage.txt",
			notifyUsParams
		),
	})

	// Now send the receipt to the user
	const notifyThemBodyText = `Thank you for requesting a demo of ues.io

Your information has been submitted. We'll be in contact shortly to schedule a time. We can't wait to show you what we've been working on.

Cheers!

The team at ues.io`

	const notifyThemParams = {
		...templateParams,
		titleText: "We'll contact you soon.",
		bodyText: notifyThemBodyText,
	}

	bot.runIntegrationAction("uesio/appkit.resend", "sendemail", {
		to: email,
		from: fromEmail,
		subject: `Demo Reequested - ues.io`,
		html: bot.mergeTemplateFile(
			"uesio/appkit.emailtemplates",
			"templates/genericmessage.html",
			{
				...notifyThemParams,
				bodyText: nl2br(notifyThemBodyText),
			}
		),
		text: bot.mergeTemplateFile(
			"uesio/appkit.emailtemplates",
			"templates/genericmessage.txt",
			notifyThemParams
		),
	})
}
