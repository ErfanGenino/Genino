// src/utils/inviteShare.js

export function buildInviteLink(token) {
  const base = "https://genino.ir";
  return `${base}/invite/${encodeURIComponent(token)}`;
}

export function buildInviteMessage({ roleLabel, childName, link }) {
  const cn = childName || "";
  const rl = roleLabel || "عضو خانواده";

  return `🌿 دعوت به ژنینو

شما به عنوان ${rl}${cn ? `ِ ${cn}` : ""}
به ژنینو و صفحه ${cn} دعوت شده‌اید.

با پذیرش این دعوت می‌توانید همراه ${cn} باشید.

لینک پذیرش دعوت:
${link}
`;
}
