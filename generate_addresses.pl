#!/strawberry/bin/perl
use strict;
use warnings;
use File::Slurp qw(read_file);

my $file = 'importfile.txt';

open my $info, $file or die "$file: $!";

my $count = 35278;

while (my $line = <$info>) {	
	$line =~ tr/;//d;
	my $hex = sprintf("%X", $count);
	print reverse split /(..)/, $hex;
	$count = $count + length($line) - 1;
	}

close $info;	
