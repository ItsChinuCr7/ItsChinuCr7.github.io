
import { useCallback, useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  GitFork,
  Github,
  RefreshCw,
  Star,
} from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/portfolio'

const GITHUB_API = 'https://api.github.com'

function prettyDate(dateString) {
  if (!dateString) return 'Update date unavailable'

  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) {
    return 'Update date unavailable'
  }

  return `Updated ${new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  }).format(date)}`
}

function ProjectGlyph({ index }) {
  const kinds = [
    'glyph-orbit',
    'glyph-grid',
    'glyph-bars',
    'glyph-wave',
    'glyph-cross',
  ]

  return (
    <div
      className={`repo-art ${kinds[index % kinds.length]}`}
      aria-hidden="true"
    >
      <span />
      <span />
      <span />
      <span />
      <i />
    </div>
  )
}

export default function GitHubProjects() {
  const [repos, setRepos] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [query, setQuery] = useState('')

  const reduce = useReducedMotion()

  const loadRepos = useCallback(async () => {
    setStatus('loading')
    setError('')

    try {
      const username = profile.githubUsername

      if (!username) {
        throw new Error(
          'GitHub username is missing in src/data/portfolio.js.'
        )
      }

      const headers = {
        Accept: 'application/vnd.github+json',
      }

      // Fetch public profile metadata and the first page of repositories.
      const [profileResponse, reposResponse] = await Promise.all([
        fetch(`${GITHUB_API}/users/${username}`, { headers }),
        fetch(
          `${GITHUB_API}/users/${username}/repos?per_page=100&type=owner&sort=updated&direction=desc`,
          { headers }
        ),
      ])

      if (!profileResponse.ok || !reposResponse.ok) {
        const response = !reposResponse.ok
          ? reposResponse
          : profileResponse

        if (response.status === 404) {
          throw new Error(
            `GitHub user "${username}" was not found. Check src/data/portfolio.js.`
          )
        }

        if (response.status === 403 || response.status === 429) {
          throw new Error(
            'GitHub API rate limit reached. Please try again later.'
          )
        }

        throw new Error(`GitHub API returned ${response.status}.`)
      }

      const [githubProfile, repoData] = await Promise.all([
        profileResponse.json(),
        reposResponse.json(),
      ])

      if (!Array.isArray(repoData)) {
        throw new Error(
          'GitHub returned an unexpected repository response.'
        )
      }

      // Keep all returned public repositories, including forks and archived repositories.
      const publicRepos = repoData.filter((repo) => !repo.private)

      // Debug information: open the browser console to inspect these values.
      console.log('GitHub username:', username)
      console.log(
        'GitHub profile public repository count:',
        githubProfile.public_repos
      )
      console.log(
        'Repositories returned by this API request:',
        publicRepos.length
      )
      console.log(
        'Repository names:',
        publicRepos.map((repo) => repo.full_name)
      )

      // Sort by stars first, then by most recent activity.
      const sortedRepos = [...publicRepos].sort((a, b) => {
        const starDifference =
          (b.stargazers_count || 0) - (a.stargazers_count || 0)

        if (starDifference !== 0) {
          return starDifference
        }

        const dateA = new Date(
          a.pushed_at || a.updated_at || 0
        ).getTime()

        const dateB = new Date(
          b.pushed_at || b.updated_at || 0
        ).getTime()

        return dateB - dateA
      })

      setRepos(sortedRepos)
      setStatus('success')
    } catch (err) {
      console.error('Failed to load GitHub repositories:', err)

      setError(
        err instanceof Error
          ? err.message
          : 'Could not load GitHub repositories.'
      )

      setStatus('error')
    }
  }, [])

  useEffect(() => {
    loadRepos()
  }, [loadRepos])

  const normalizedQuery = query.trim().toLowerCase()

  const visibleRepos = repos
    .filter((repo) => {
      const searchableText = [
        repo.name,
        repo.description || '',
        repo.language || '',
        repo.full_name || '',
      ]
        .join(' ')
        .toLowerCase()

      return searchableText.includes(normalizedQuery)
    })
    .slice(0, showAll ? 100 : 6)

  return (
    <div className="github-panel">
      <div className="github-panel__top">
        <div className="github-identity">
          <span className="github-icon">
            <Github size={20} />
          </span>

          <div>
            <div className="mono-label">PUBLIC REPOSITORIES</div>
            <h3>@{profile.githubUsername}</h3>
          </div>
        </div>

        <div className="github-actions">
          <button
            type="button"
            className="icon-button"
            onClick={loadRepos}
            disabled={status === 'loading'}
            aria-label="Refresh repositories"
            title="Refresh repositories"
          >
            <RefreshCw
              size={15}
              className={status === 'loading' ? 'spin' : ''}
            />
          </button>

          <a
            className="text-link"
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open profile <ArrowUpRight size={15} />
          </a>
        </div>
      </div>

      <div className="github-panel__rule" />

      {status === 'success' && repos.length > 0 && (
        <>
          <div className="github-toolbar">
            <p>
              <span className="status-dot" /> Live from GitHub
              <span className="faint-sep"> / </span>
              {repos.length} public{' '}
              {repos.length === 1 ? 'repository' : 'repositories'}
            </p>

            <label className="repo-search">
              <span className="sr-only">
                Search public repositories
              </span>

              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setShowAll(false)
                }}
                placeholder="Filter repos…"
              />
            </label>
          </div>

          <div className="repo-grid">
            <AnimatePresence mode="popLayout">
              {visibleRepos.map((repo, index) => (
                <motion.article
                  layout={!reduce}
                  key={repo.id}
                  className="repo-card"
                  initial={
                    reduce ? false : { opacity: 0, y: 18 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.42,
                    delay: reduce ? 0 : (index % 6) * 0.05,
                  }}
                >
                  <div className="repo-card__head">
                    <ProjectGlyph index={index} />

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="repo-open"
                      aria-label={`Open ${repo.name} on GitHub`}
                    >
                      <ArrowUpRight size={17} />
                    </a>
                  </div>

                  <div className="repo-card__body">
                    <h4>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {repo.name.replaceAll('-', ' ')}
                      </a>
                    </h4>

                    <p>
                      {repo.description ||
                        'A public repository. Open it on GitHub to explore the code and README.'}
                    </p>
                  </div>

                  <div className="repo-meta">
                    <span className="repo-language">
                      <i
                        style={{
                          backgroundColor: languageColor(repo.language),
                        }}
                      />
                      {repo.language || 'Code'}
                    </span>

                    <span>
                      <Star size={13} /> {repo.stargazers_count || 0}
                    </span>

                    <span>
                      <GitFork size={13} /> {repo.forks_count || 0}
                    </span>
                  </div>

                  <div className="repo-updated">
                    {prettyDate(repo.pushed_at || repo.updated_at)}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {visibleRepos.length === 0 && (
            <p className="empty-search">
              No repositories match “{query}”. Try another term.
            </p>
          )}

          {repos.length > 6 && (
            <button
              type="button"
              className="load-more"
              onClick={() => setShowAll((value) => !value)}
            >
              {showAll
                ? 'Show fewer'
                : `Show all ${repos.length} repositories`}
              <ArrowDownRight size={16} />
            </button>
          )}
        </>
      )}

      {status === 'loading' && (
        <div className="github-state">
          <div className="loader-orbit">
            <span />
          </div>

          <p>Asking GitHub what you have been building…</p>
          <span className="microcopy">
            Public API · no access token required
          </span>
        </div>
      )}

      {status === 'error' && (
        <div className="github-state github-state--error">
          <div className="state-mark">!</div>

          <h4>Couldn’t fetch repositories</h4>
          <p>{error}</p>

          <button
            type="button"
            className="button button--quiet"
            onClick={loadRepos}
          >
            Try again <RefreshCw size={14} />
          </button>
        </div>
      )}

      {status === 'success' && repos.length === 0 && (
        <div className="github-state">
          <Github size={28} />

          <h4>No public repositories found</h4>

          <p>
            GitHub did not return any public repositories for this account.
            Check the username and repository visibility.
          </p>

          <a
            className="text-link"
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Check the GitHub profile <ExternalLink size={14} />
          </a>
        </div>
      )}
    </div>
  )
}

function languageColor(language) {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572a5',
    HTML: '#e34c26',
    CSS: '#663399',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    Jupyter: '#DA5B0B',
    R: '#198CE7',
    Shell: '#89e051',
    Go: '#00ADD8',
    Rust: '#dea584',
    Vue: '#41b883',
    Dart: '#00B4AB',
    Kotlin: '#A97BFF',
  }

  return colors[language] || '#c5fa68'
}
