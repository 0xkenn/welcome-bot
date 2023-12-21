const WelcomeChannelSchema = require('../../models/WelcomeChannel');

/**
 * 
 * @param {import('discord.js').GuildMember} GuildMember 
 */

module.exports = async (GuildMember) => {
    try{
        if(GuildMember.user.bot) return;

        const welcomeConfigs = await WelcomeChannelSchema.find({
            guildId: GuildMember.guild.id,
        });

        if(!welcomeConfigs.length) return;

        for (const welcomeConfig of welcomeConfigs){
            const targetChannel = 
            GuildMember.guild.channels.cache.get
            (
                welcomeConfig.channelId) || 
                (await GuildMember.guild.channels.fetch(
                    welcomeConfig.channelId
                ));

                if(!targetChannel) {
                    WelcomeChannelSchema.findOneAndDelete({
                        guildId: GuildMember.guild.id,
                        channelId: welcomeConfig.channelId,
                    }).catch(() => {});
                }
            const customMessage = welcomeConfig.customMessage || 'Hey {username}👋. Welcome to {server-name}';

            const welcomeMessage = customMessage
                .replace('{mention-member}', `<@${GuildMember.id}>`)
                .replace('{username}', GuildMember.user.username)
                .replace('{server-name}', GuildMember.guild.name);

                targetChannel.send(welcomeMessage).catch(() => {});
                
        }

    } catch (error) {
        console.log(`Error in ${__filename}\n`, error);
    }
}