# Confidentiality and publication rules

Never put confidential information in a public repository. This includes real customer or employee information, credentials, private infrastructure, internal documents, exports, screenshots, logs and private Git history. Use synthetic demo data only, including in tests, issues and commit messages.

Keep this edition separate from the private application. Do not add its remote, copy its history or merge its branches. Do not access production services. Do not add integrations, uploads, telemetry or remote resources without a separate scoped decision.

Before every public publication, present the exact commit, archive digest, included files, test results and remaining rights questions to the user and obtain explicit approval. A successful check or earlier approval is not approval for a later publication. Do not create public repositories, push publicly, publish packages or deploy automatically.

All new files must be explicitly reviewed and added to scripts/check-release.mjs. Pattern scans complement human review; they cannot establish that arbitrary text is confidential or safe.
