// makes sure that each request is processed dynamically and responses are not cached.
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

// imports the Bot and webhookCallback helpers from the Grammy SDK
import { Bot, Context, GrammyError, HttpError, NextFunction, webhookCallback } from 'grammy'

const token = process.env.TELEGRAM_BOT_TOKEN
if (!token) throw new Error('TELEGRAM_BOT_TOKEN environment variable not found.')

// initializes a Telegram Bot API compatible bot instance
const bot = new Bot(token)
console.log('telegram bot instanciated')

/**
 * apply middlewares
 * https://grammy.dev/guide/middleware
 */

async function responseTime(ctx: Context, next: NextFunction): Promise<void> {
    const before = Date.now() // milliseconds
    await next() // invoke downstream middleware
    const after = Date.now() // milliseconds
    console.log(`Response time: ${after - before} ms`)
}

bot.use(responseTime)

/**
 * handle errors
 * https://grammy.dev/guide/errors
 */

bot.catch((err) => {
    const ctx = err.ctx
    console.error(`Error while handling update ${ctx.update.update_id}:`)
    const e = err.error
    if (e instanceof GrammyError) console.error('Error in request:', e.description)
    else if (e instanceof HttpError) console.error('Could not contact Telegram:', e)
    else console.error('Unknown error:', e)
})

/**
 * handle message, commands, etc
 * https://grammy.dev/guide/basics
 */

bot.command('start', (ctx) => ctx.reply('Welcome! Up and running.'))
bot.on('message:text', async (ctx) => await ctx.reply(`text=${ctx.message.text}`)) // https://grammy.dev/guide/filter-queries

/**
 * exports the webhookCallback helper relying on standard HTTP Request and Response mechanism as the handler to incoming POST requests.
 * https://www.launchfa.st/blog/telegram-nextjs-app-router
 * https://grammy.dev/guide/deployment-types#how-to-use-webhooks
 * https://telegram.tools/webhook-manager
 * note that you must not call bot.start() when using webhooks.
 */

export const POST = webhookCallback(bot, 'std/http')
