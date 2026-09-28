import type { Book, ResourceLanguage } from '../types/resource';

let bid = 1;
function B(
title: string,
author: string,
year: number,
pages: number,
category: string,
accessType: string,
url: string,
language: ResourceLanguage,
tags: string[],
description: string,
featured?: boolean)
: Book {
  return { id: bid++, title, author, year, pages, category, accessType, url, language, tags, description, featured: !!featured, pricing: 'free' };
}

export const books: Book[] = [
B('The Design of Everyday Things', 'Don Norman', 2013, 368, 'industrial', 'open_library', 'https://openlibrary.org/works/OL4258622W', 'english', ['usability', 'design thinking'], 'A classic guide to human-centered design and the psychology of everyday objects.', true),
B('Don\u2019t Make Me Think', 'Steve Krug', 2014, 216, 'uiux', 'open_library', 'https://openlibrary.org/works/OL576941W', 'english', ['usability', 'web'], 'A common-sense approach to web usability.', false),
B('Thinking with Type', 'Ellen Lupton', 2010, 208, 'fonts', 'internet_archive', 'https://archive.org/details/thinkingwithtype00lupt', 'english', ['typography', 'graphic design'], 'A critical guide for designers, writers, editors, and students on typography.', false),
B('Grid Systems in Graphic Design', 'Josef M\u00fcller-Brockmann', 1996, 176, 'fonts', 'other_url', 'https://www.niggli.com/en/books/grid-systems-in-graphic-design', 'english', ['grids', 'layout'], 'The definitive work on grid systems in graphic design.', false),
B('About Face: The Essentials of Interaction Design', 'Alan Cooper', 2014, 720, 'uiux', 'other_url', 'https://www.wiley.com/en-us/About+Face%3A+The+Essentials+of+Interaction+Design%2C+4th+Edition-p-9781118766576', 'english', ['interaction design', 'ux'], 'A comprehensive guide to interaction design fundamentals.', false),
B('A Pattern Language', 'Christopher Alexander', 1977, 1216, 'architecture', 'mega', 'https://mega.nz', 'english', ['architecture', 'patterns'], 'A timeless guide to building towns, buildings, and human life.', false)];