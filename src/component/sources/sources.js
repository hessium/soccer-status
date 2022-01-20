const sources = {
  competitions: "/v2/competitions",
  competition: (id) => `/v2/competitions/${id}`,

  teams: (id) => `/v2/competitions/${id}/teams`,
  teamMatches: (id) => `/v2/teams/${id}/matches/`,

  matches: "/v2/matches",
  match: (id) => `/v2/matches/${id}`,
};

export default sources;
