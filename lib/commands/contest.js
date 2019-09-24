'use strict';
var _ = require('underscore');

var h = require('../helper');
var chalk = require('../chalk');
var icon = require('../icon');
var log = require('../log');
var core = require('../core');

const cmd = {
  command: 'contest [keyword]',
  aliases: ['contests'],
  desc:    'Solve questions from a contest',
  builder: function(yargs) {
    return yargs
      .positional('keyword', {
        type:     'string',
        default:  '',
        describe: 'Filter contests by keyword'
      })
      .example(chalk.yellow('leetcode contest'), 'List all contests')
      .example(chalk.yellow('leetcode contest weekly-contest-155'), 'List questions from a contest');
  }
};

cmd.handler = function(argv) {
  let keyword = argv.keyword;
  log.debug('argv: ' + keyword);
  if (keyword.length > 0) {
    // Show questions of a specific contest
    core.getContestQuestions(keyword, function(e, questions) {
      if (e) return log.fail(e);

      for (let q of questions) {
        log.printf('%-60s (%s)',
          q.name,
          q.slug
        );
      }
    });
  } else {
    // List all contests
    core.getContests(function(e, contests) {
      if (e) return log.fail(e);

      for (let c of contests) {
        log.printf('%s (%s)',
          c.title,
          c.titleSlug
        );
      }
    });
  }
};

module.exports = cmd;
