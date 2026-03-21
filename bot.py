import os
from dotenv import load_dotenv
import anthropic
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, MessageHandler, filters, ContextTypes

load_dotenv()

TELEGRAM_TOKEN = os.environ["TELEGRAM_TOKEN"]
ANTHROPIC_API_KEY = os.environ["ANTHROPIC_API_KEY"]

claude = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

# 사용자별 대화 기록 저장
conversation_histories: dict[int, list] = {}


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "안녕하세요! Claude AI 봇입니다.\n"
        "메시지를 보내면 Claude가 답변해 드립니다.\n\n"
        "/clear - 대화 기록 초기화"
    )


async def clear(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    conversation_histories.pop(user_id, None)
    await update.message.reply_text("대화 기록이 초기화되었습니다.")


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    user_text = update.message.text

    if user_id not in conversation_histories:
        conversation_histories[user_id] = []

    conversation_histories[user_id].append({"role": "user", "content": user_text})

    await update.message.chat.send_action("typing")

    try:
        response = claude.messages.create(
            model="claude-opus-4-6",
            max_tokens=16000,
            messages=conversation_histories[user_id],
        )

        assistant_text = next(
            (block.text for block in response.content if block.type == "text"), ""
        )

        conversation_histories[user_id].append(
            {"role": "assistant", "content": assistant_text}
        )

        await update.message.reply_text(assistant_text)

    except Exception as e:
        await update.message.reply_text(f"오류가 발생했습니다: {e}")


def main():
    app = ApplicationBuilder().token(TELEGRAM_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("clear", clear))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    print("봇이 시작되었습니다...")
    app.run_polling()


if __name__ == "__main__":
    main()
