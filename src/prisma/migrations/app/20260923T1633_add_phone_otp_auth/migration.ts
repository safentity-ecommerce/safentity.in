#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/5b4c887b436e60fca1bcec7cc7f2e3e0c0db116e5a137c68a0b54c571da4e9a2/contract';
import endContract from '../../snapshots/5b4c887b436e60fca1bcec7cc7f2e3e0c0db116e5a137c68a0b54c571da4e9a2/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/7126665ab54a65e0e54556bb259e7de53b77f71ecd1080516cbb0033c279c3f5/contract';
import startContract from '../../snapshots/7126665ab54a65e0e54556bb259e7de53b77f71ecd1080516cbb0033c279c3f5/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'otp_challenges',
        columns: [
          col('attempts', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('codeHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('expiresAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addColumn({
        schema: 'public',
        table: 'users',
        column: col('phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dropNotNull({ schema: 'public', table: 'users', column: 'email' }),
      this.dropNotNull({ schema: 'public', table: 'users', column: 'name' }),
      this.dropNotNull({ schema: 'public', table: 'users', column: 'password_hash' }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_phone_key',
        columns: ['phone'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
