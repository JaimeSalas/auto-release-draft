import * as core from '@actions/core'
import * as event from './event';
import * as version from './version';
import * as git from './git';
import * as github from './github';

export async function run(): Promise<void> {
  try {
    const token = core.getInput('repo-token');

    const tag = event.getCreatedTag();
    let releaseUrl = '';

    if (tag && version.isSemver(tag)) {
      const changelog = await git.getChangesIntroducedByTag(tag);
      releaseUrl = await github.createReleaseDraft(tag, token, changelog);
    }

    core.setOutput('release-url', releaseUrl)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

/*
TAG RELEASE - commit 7
commit 5 
commit 6 
TAG RELEASE - commit 4
commit 3
commit 2
commit 1
*/
