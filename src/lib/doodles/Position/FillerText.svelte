<script lang="ts">
  const paragraphs = [
    'Grace Hopper was a pioneering computer scientist and United States Navy rear admiral. She was one of the first programmers of the Harvard Mark I computer, and invented the first compiler, an important tool that translates written code into machine language that a computer can understand.',
    'Hopper popularized the term "debugging" to describe the process of removing errors from a computer program. Her associates discovered a moth stuck in a relay and thereby impeding operation, whereupon she remarked that they were "debugging" the system.',
    `She also helped develop COBOL, one of the first high-level programming languages. Hopper's contributions to computer science and technology were significant and she is often referred to as the "mother of computing."`,
    'Hopper was known to carry around a piece of wire that was exactly one foot long, which she called her "standard." She would use this wire to help explain the concept of a "nanosecond" (one billionth of a second) to her colleagues. It was a way to physically show them how small a nanosecond is and help them understand the speed at which computers worked.'
  ];

  const redactedParagraphs = paragraphs.map((paragraph) =>
    paragraph
      .split(' ')
      .map((t) => '█'.repeat(t.length))
      .join(' ')
  );
</script>

<p class="text">
  {#each redactedParagraphs as p, i (i)}
    <span>{p}</span>
  {/each}
</p>

<style>
  @import '../../../global.css';

  .text {
    display: flex;
    flex-direction: column;
    gap: 12px;

    width: 150%;

    line-height: 1.5em;
    word-spacing: 1.5em;
  }
</style>
