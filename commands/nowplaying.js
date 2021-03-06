const { splitBar } = require("string-progressbar");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  description: "顯示目前正在播放的歌曲",
  execute(message) {
    const queue = message.client.players.get(message.guild.id);
    if (!queue) {
      message.reply("❌ ┃ 目前沒有任何歌曲正在播放!")
        .catch(console.error);
    }
    const song = queue.current;
    const seek = queue.playTime;
    const left = song.duration - seek;

    let nowPlaying = new MessageEmbed()
      .setTitle("目前正在播放")
      .setDescription(
        `${queue.repeat ? "🔂 ┃ 重複播放單曲" : ""} ${queue.loop ? "🔁 ┃ 重複播放全部" : ""}${queue.repeat || queue.loop ? "\n" : ""}` +
        "[" + song.title + "](" + song.url + ")" +
        "\n目前播到 " + new Date(seek * 1000).toISOString().substr(11, 8) +
        "\n\n" +
        splitBar(song.duration == 0 ? seek : song.duration, seek, 20, "━", "🔵")[0] +
        "\n\n總長度是 " + (song.duration == 0 ? " 🔴 直播影片" : new Date(song.duration * 1000).toISOString().substr(11, 8)))
      .setThumbnail(song.thumbnail)
      .setColor("BLURPLE");

    if (song.duration > 0) nowPlaying.setFooter("還剩下" + new Date(left * 1000).toISOString().substr(11, 8));

    return message.reply({
      embeds: [nowPlaying]
    }).catch(console.error);
  }
};