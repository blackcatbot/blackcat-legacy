const { canModifyQueue } = require("../util/Util");

module.exports = {
  name: "stop",
  aliases: ["dc", "disconnect"],
  description: "停止播放歌曲",
  execute(message) {
    const queue = message.client.players.get(message.guild.id);

    if (!queue) {
      message.reply("❌ ┃ 目前沒有任何歌曲正在播放!")
        .catch(console.error);
    }
    if (!canModifyQueue(message.member)) {
      return message.reply("❌ ┃ 你必須跟我在同一個頻道裡!")
        .catch(console.error);
    }

    try {
      queue.songs = [];
      queue.stop();
    } catch {
      try {
        queue.connection.destroy();
      } catch (e) {
        console.log(e);
      }
      return message.reply("<:stop:827734840891015189> ┃ 停止播放歌曲停止播放歌曲時發生錯誤, 已強制停止音樂")
        .catch(console.error);
    }
    message.reply("<:stop:827734840891015189> ┃ 停止播放歌曲")
      .catch(console.error);
  }
};